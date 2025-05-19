import { FilterQuery, Query } from "mongoose";

class QueryBuilder<T> {
  public queryModel: Query<T[], T>;
  public query: Record<string, unknown>;

  constructor(queryModel: Query<T[], T>, query: Record<string, unknown>) {
    this.queryModel = queryModel;
    this.query = query;
  }

  search(searchableFields: { field: string; type: "string" | "number" }[]) {
    const searchTerm = this?.query?.searchTerm || "";
    if (!searchTerm) {
      return this;
    }

    const orConditions: FilterQuery<T>[] = searchableFields.flatMap(
      ({ field, type }) => {
        if (type === "string") {
          return [
            { [field]: { $regex: searchTerm, $options: "i" } },
          ] as FilterQuery<T>[];
        }

        if (type === "number") {
          const num = Number(searchTerm);
          if (isNaN(num)) return [];
          return [{ [field]: num }] as FilterQuery<T>[];
        }

        return [];
      }
    );

    if (orConditions.length > 0) {
      this.queryModel = this.queryModel.find({ $or: orConditions });
    }

    return this;
  }
  filter() {
    const queryObj = { ...this?.query };
    const excludeFields = ["searchTerm", "sort", "limit", "page", "fields"];
    excludeFields.forEach((field) => delete queryObj[field]);
    this.queryModel = this.queryModel.find(queryObj);
    return this;
  }

  sort() {
    const fields =
      (this?.query?.sort as string)?.split(",").join(" ") || "-createdAt";
    this.queryModel = this.queryModel.sort(fields);
    return this;
  }

  limit() {
    const limit = Number(this.query?.limit || 10);
    this.queryModel = this.queryModel.limit(limit);
    return this;
  }

  paginate() {
    const page = Number(this.query.page) || 1;
    const limit = Number(this.query?.limit) || 10;
    const skip = (page - 1) * limit;
    this.queryModel = this.queryModel.skip(skip);
    return this;
  }

  fields() {
    const fields =
      (this?.query?.fields as string)?.split(",").join(" ") || "-__v";
    this.queryModel = this.queryModel.select(fields);
    return this;
  }
}
export default QueryBuilder;
