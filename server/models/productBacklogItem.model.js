const db = require('../config');

class ProductBacklogItemModel {
  addProductBacklogItem(projectID, description, callback) {
    db.query(
      'INSERT INTO "productBacklogItem" ("PBItemID" ,"projectID", description) VALUES (next_pbi_id($1), ($1), ($2)) RETURNING *',
      [projectID, description],
      callback
    );
  }

  editProductBacklogItem(pbiID, description, callback) {
    db.query(
      'UPDATE "productBacklogItem" SET description = ($2) WHERE "PBItemID" = ($1) RETURNING *',
      [pbiID, description],
      callback
    );
  }

  getProjectsProductBacklogItem(projectID, callback) {
    db.query(
      `select * from "productBacklogItem" where "projectID" = ($1)`,
      [projectID],
      callback
    );
  }

  isPBIBreakdowned(pbiID, callback) {
    db.query(
      'select exists (select 1 from "productBacklogItem", "userStory" where "productBacklogItem"."PBItemID" = ($1) and "productBacklogItem"."PBItemID" = "userStory"."PBItemID")',
      [pbiID],
      callback
    );
  }

  getProductBacklogItemByID(pbiID, callback) {
    db.query(
      'select * from "productBacklogItem" where "PBItemID" = ($1)',
      [pbiID],
      callback
    );
  }
}

module.exports = new ProductBacklogItemModel();
