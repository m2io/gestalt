use tauri_plugin_sql::{Migration, MigrationKind};

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    let migrations = vec![
        Migration {
            version: 1,
            description: "create_initial_tables",
            sql: "
						CREATE TABLE IF NOT EXISTS weights (
								id      INTEGER PRIMARY KEY AUTOINCREMENT,
								date    TEXT NOT NULL,
								weight  REAL NOT NULL
						);
				",
            kind: MigrationKind::Up,
        },
        Migration {
            version: 2,
            description: "delete_initial_tables",
            sql: "DROP TABLE IF EXISTS weights;",
            kind: MigrationKind::Down,
        },
    ];

    tauri::Builder::default()
        .plugin(
            tauri_plugin_sql::Builder::default()
                .add_migrations("sqlite:gestalt.db", migrations)
                .build(),
        )
        .plugin(tauri_plugin_shell::init())
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
