CREATE TABLE IF NOT EXISTS regions (
    region_id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    region_name TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS countries (
	country_id text NOT NULL,
	country_name text NOT NULL,
	region_id INTEGER NOT NULL,
	PRIMARY KEY (country_id ASC),
	FOREIGN KEY (region_id) REFERENCES regions (region_id) ON DELETE CASCADE ON UPDATE CASCADE
);

/* 收藏的工具 */
CREATE TABLE IF EXISTS collected_tools (
  collected_tools_id text NOT NULL,
  
)
