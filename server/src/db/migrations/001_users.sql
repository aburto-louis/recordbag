CREATE TABLE users (
    id            INTEGER PRIMARY KEY,
    name          TEXT NOT NULL,
    email         TEXT NOT NULL COLLATE NOCASE UNIQUE,
    username      TEXT NOT NULL COLLATE NOCASE UNIQUE,
    password_hash TEXT NOT NULL,
    country_code  TEXT,
    avi_key       TEXT,
    admin         INTEGER NOT NULL DEFAULT 0 CHECK (admin IN (0, 1)),
    created_at    INTEGER NOT NULL DEFAULT (unixepoch())
) STRICT;

CREATE TABLE user_sessions (
    token_hash TEXT PRIMARY KEY,
    user_id    INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    expires_at INTEGER NOT NULL
) STRICT, WITHOUT ROWID;

CREATE INDEX idx_user_sessions_user_id ON user_sessions(user_id);
CREATE INDEX idx_user_sessions_expires_at ON user_sessions(expires_at);
