import { ReactNode } from "react";

interface OriginProgram {
  id: number;
  depth: number;
  programCode: string;
  programName: string;
  applicationCode: string;
  parentProgramCode: string;
  description?: string;
  programIndex?: number;
  path?: string;
  href?: string;
  icon?: string;
  isActive: boolean;
}

interface ProgramMenu {
  id: string;
  label: string;
  href?: string;
  path: string;
  icon?: ReactNode;
  children?: ProgramMenu[];
}

export type { OriginProgram, ProgramMenu };
