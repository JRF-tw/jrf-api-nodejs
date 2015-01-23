"use strict";

module.exports = {
  up: function(migration, DataTypes, done) {
    // add altering commands here, calling 'done' when finished
    migration.createTable(
      'data',
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        createdAt: {
          type: DataTypes.DATE
        },
        updatedAt: {
          type: DataTypes.DATE
        },
        CategoryId: DataTypes.INTEGER,
        CarrierId: DataTypes.INTEGER,
        PatternId: DataTypes.INTEGER,
        identifier: {
          type: DataTypes.STRING,
          index: true,
          unique: true
        },
        sensitive: {
          type: DataTypes.BOOLEAN,
          defaultValue: false,
          allowNull: false
        },
        title: DataTypes.STRING,
        contributor: DataTypes.STRING,
        IssueId: DataTypes.INTEGER,
        publisher: DataTypes.STRING,
        date: DataTypes.DATE,
        unit: DataTypes.STRING,
        size: DataTypes.STRING,
        page: DataTypes.STRING,
        quantity: DataTypes.STRING,
        LanguageId: DataTypes.INTEGER,
        subject: DataTypes.STRING,
        catalog: DataTypes.TEXT,
        information: DataTypes.STRING,
        CollectorId: DataTypes.INTEGER,
        comment: DataTypes.TEXT,
        copyright: DataTypes.STRING,
        rightInRem: DataTypes.STRING,
        ownership: DataTypes.STRING,
        published: {
          type: DataTypes.BOOLEAN,
          defaultValue: true,
          allowNull: false
        },
        licence: DataTypes.STRING,
        filename: DataTypes.STRING,
        filetype: DataTypes.STRING,
        creator: DataTypes.STRING,
        commentor: DataTypes.STRING,
        commentedAt: DataTypes.DATE,
        modifier: DataTypes.STRING,
        modifiedAt: DataTypes.DATE
      },
      {
        charset: 'UTF-8' // default: null
      }
    );
    done();
  },

  down: function(migration, DataTypes, done) {
    migration.dropTable('data');
    done();
  }
};
/**

"資源類型", category -> belongs_to
"載體", carrier -> belongs_to
"型式", pattern -> belongs_to
"資料識別碼", identifier
"敏感資料與否", sensitive t/f
"文件標題", title
"貢獻者", contributor
"案名", case  -> belongs_to
"出版者", publisher
"顯示用", display_date
"檢索用", search_date date
"單位", unit
"大小", size
"面數", page
"檔案數量", quantity
"語言", language  -> belongs_to
"主題", subject
"關鍵字", keyword has_and_belongs to many
"目次／附件", catalog
"內容描述", content
"對應資訊", information
"典藏單位", collector  -> belongs_to
"附註項", comment
"著作權", copyright
"財產物權", right_in_rem
"所有權人", ownership
"公開與否", published t/f
"授權狀況", licence
"檔案名稱", filename
"檔案格式", filetype
"登錄者", creator
"建檔日期", created_at
"描述者", commentor
"描述日期", commented_at
"修改者", modifier
"修改日期", modified_at

*/