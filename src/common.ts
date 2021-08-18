import { LocationDescriptor } from "history";

export enum IssueStateFilter {
  open = "open",
  closed = "closed",
  all = "all",
}

export enum IssueSortingOption {
  comments = "comments",
  created = "created",
  updated = "updated",
}

export enum IssueSortingDirection {
  asc = "asc",
  desc = "desc",
}

export const ITEMS_PER_PAGE_VARIANTS = [10, 20, 30, 50, 100];
export const DEFAULT_ITEMS_PER_PAGE = ITEMS_PER_PAGE_VARIANTS[2];

export type User = {
  url?: string;
  avatarUrl?: string;
  login: string;
};

export type ReactionType =
  | "+1"
  | "-1"
  | "laugh"
  | "confused"
  | "hooray"
  | "heart"
  | "eyes"
  | "rocket";

export type BookmarkedIssue = {
  link: LocationDescriptor;
  name: string;
  number: string;
};
