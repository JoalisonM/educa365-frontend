import { ReactNode, useCallback, useState } from "react";
import { createContext } from "use-context-selector";
import { useToast } from "@ui/components/ui/use-toast";

import { ReportComments } from "@api/reportComments";
import { CreateReportInput, ReportCommentsProps } from "@dtos/reportCommentsDTO";

interface ReportCommentsContextType {
  comments: ReportCommentsProps[];
  fetchComments: () => Promise<any>;
  deleteComment: (id: string) => void;
  createComment: (data: CreateReportInput) => Promise<ReportCommentsProps | any>;
}

export const ReportCommentsContext = createContext({} as ReportCommentsContextType);

interface ReportCommentsContextProviderProps {
  children: ReactNode;
}

export const ReportCommentsContextProvider = ({ children }: ReportCommentsContextProviderProps) => {
  const { toast } = useToast();
  const [comments, setComments] = useState<ReportCommentsProps[]>([]);

  const fetchComments = useCallback(async () => {
    const response = await ReportComments.getAll();

    setComments(response.data);

    return response;
  }, []);

  const createComment = useCallback(async (data: CreateReportInput) => {
    try {
      const response = await ReportComments.create(data);

      if (response.data) {
        toast({
          title: "Comentário criado com sucesso.",
        });

        setComments([...comments, response.data]);
      }

      return response;
    } catch (err) {
      toast({
        title: "Erro ao criar comentário.",
      });
    }
  }, []);

  const deleteComment = async (id: string) => {
    await ReportComments.delete(id);

    setComments((state) => state.filter((comment) => comment.id !== id));
  };

  return (
    <ReportCommentsContext.Provider
      value={{
        comments,
        createComment,
        fetchComments,
        deleteComment,
      }}
    >
      {children}
    </ReportCommentsContext.Provider>
  );
};
