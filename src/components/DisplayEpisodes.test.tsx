import { formatSeasonAndEpisode } from "./DisplayEpisodes";

test("formatSeasonAndEpisode returns an added zero when needed", () => {
  expect(formatSeasonAndEpisode(10, 12)).toBe("S10E12");
  expect(formatSeasonAndEpisode(1, 2)).toBe("S01E02");
  expect(formatSeasonAndEpisode(14, 4)).toBe("S14E04");
});
