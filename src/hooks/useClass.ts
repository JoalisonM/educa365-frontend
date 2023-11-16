import { useContextSelector } from "use-context-selector";

import { ClassContext } from "../contexts/classContext";

export const useClass = () => {
  const classes = useContextSelector(
    ClassContext,
    (context) => context.classes,
  );
  const institutionClass = useContextSelector(
    ClassContext,
    (context) => context.institutionClass,
  );
  const getClass = useContextSelector(
    ClassContext,
    (context) => context.getClass,
  );
  const addTeacher = useContextSelector(
    ClassContext,
    (context) => context.addTeacher,
  );
  const deleteClass = useContextSelector(
    ClassContext,
    (context) => context.deleteClass,
  );
  const fetchClasses = useContextSelector(
    ClassContext,
    (context) => context.fetchClasses,
  );
  const createClasses = useContextSelector(
    ClassContext,
    (context) => context.createClasses,
  );

  return {
    getClass,
    classes,
    addTeacher,
    deleteClass,
    fetchClasses,
    createClasses,
    institutionClass,
  };
};
