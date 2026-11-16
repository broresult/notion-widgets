# notion-widgets

Small, quiet widgets to embed in Notion pages.
Notion 페이지에 넣어 쓰는 작은 위젯 모음이에요.

## Flip clock

회색 플립시계. 보는 사람 기기의 시간을 보여줘요.

**Notion에 넣는 법**
1. Notion 페이지에서 `/embed` 입력
2. 아래 주소 붙여넣기 → `Embed link`
3. 모서리를 끌어 크기 조절 (시계가 칸 크기에 맞춰 줄고 늘어나요)

```
https://broresult.github.io/notion-widgets/clock/
```

**옵션** — 주소 뒤에 붙여요

| 옵션 | 뜻 | 예시 |
|---|---|---|
| (없음) | 기기의 라이트/다크 설정을 자동으로 따라감 | `.../clock/` |
| `h=24` | 24시간제 | `.../clock/?h=24` |
| `theme=dark` | 항상 Notion 다크 모드 배경(#191919) | `.../clock/?theme=dark` |
| `theme=light` | 항상 흰 배경 | `.../clock/?theme=light` |

둘 다 쓰려면 `.../clock/?h=24&theme=dark`

## Privacy

- 외부 서버에 아무 요청도 보내지 않아요. 글꼴도 이 저장소 안에 있어요.
- 위치, 쿠키, 저장소(localStorage), 방문 통계를 쓰지 않아요.
- 모든 계산은 보는 사람의 브라우저 안에서만 일어나요.

## Development

```
npm test
```

## License

Code: MIT (see `LICENSE`).
Font: Archivo Black, SIL Open Font License 1.1 (see `fonts/OFL.txt`).

## This week

이번 주(월–일) 날짜 범위와 주 번호를 보여줘요. 매주 자동으로 바뀌어요.

```
https://broresult.github.io/notion-widgets/week/
```

옵션은 시계와 같아요(`theme=dark`, `theme=light`, 없으면 자동).
