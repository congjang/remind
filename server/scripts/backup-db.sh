#!/usr/bin/env bash
# server/prisma/schema.prisma의 실사용자 데이터(User·JournalEntry 등)를 pg_dump로 백업.
# Railway 등 매니지드 호스팅의 자동 백업 여부와 무관하게 동작하는 독립적인 방어선.
set -euo pipefail

cd "$(dirname "$0")/.."

if [ -z "${DATABASE_URL:-}" ]; then
  if [ -f .env ]; then
    set -a
    # shellcheck disable=SC1091
    source .env
    set +a
  fi
fi

if [ -z "${DATABASE_URL:-}" ]; then
  echo "[backup-db] FATAL: DATABASE_URL이 설정되지 않았습니다 (.env 또는 환경변수 확인)" >&2
  exit 1
fi

BACKUP_DIR="${BACKUP_DIR:-./backups}"
mkdir -p "$BACKUP_DIR"

TIMESTAMP="$(date -u +%Y%m%dT%H%M%SZ)"
OUT_FILE="$BACKUP_DIR/snatty-db-${TIMESTAMP}.dump"

echo "[backup-db] pg_dump 시작 → $OUT_FILE"
pg_dump --format=custom --file="$OUT_FILE" "$DATABASE_URL"
echo "[backup-db] 완료 — $(du -h "$OUT_FILE" | cut -f1)"

# 최근 KEEP_COUNT개만 로컬에 남기고 오래된 백업 정리(기본 14개 — 매일 1회면 약 2주치).
KEEP_COUNT="${KEEP_COUNT:-14}"
# shellcheck disable=SC2012
ls -1t "$BACKUP_DIR"/snatty-db-*.dump 2>/dev/null | tail -n +$((KEEP_COUNT + 1)) | xargs -r rm -f
