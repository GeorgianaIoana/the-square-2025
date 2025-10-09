declare module "lucide-react" {
  import { ComponentType, SVGProps } from "react";

  export interface LucideProps extends SVGProps<SVGSVGElement> {
    size?: string | number;
    color?: string;
    strokeWidth?: string | number;
  }

  export const Mail: ComponentType<LucideProps>;
  export const Phone: ComponentType<LucideProps>;
  export const MapPin: ComponentType<LucideProps>;
  export const CheckCircle: ComponentType<LucideProps>;
  export const ArrowLeft: ComponentType<LucideProps>;
  export const ChevronRight: ComponentType<LucideProps>;
  export const ChevronLeft: ComponentType<LucideProps>;
}
