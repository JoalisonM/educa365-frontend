import { useContextSelector } from "use-context-selector";

import { ReportCommentsContext } from "@contexts/reportCommentsContext";

export const useReportComments = () => {
  const comments = useContextSelector(ReportCommentsContext, (context) => context.comments);
  const createComment = useContextSelector(ReportCommentsContext, (context) => context.createComment);
  const fetchComments = useContextSelector(ReportCommentsContext, (context) => context.fetchComments);
  const deleteComment = useContextSelector(ReportCommentsContext, (context) => context.deleteComment);

  return {
    comments,
    createComment,
    fetchComments,
    deleteComment,
  };
};
