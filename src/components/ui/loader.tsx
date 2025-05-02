export interface LoaderProps {
    size?: "sm" | "md" | "lg";
}
const sizeMap = {
    sm: "h-10 w-10",
    md: "h-16 w-16",
    lg: "h-24 w-24",
  }

export const Loader = ({size= "sm"}: LoaderProps) => {
    const className = sizeMap[size]

    return (
      <div className="flex items-center justify-center">
        <div
        className={`animate-spin rounded-full border-4 border-solid 
            border-primary border-t-transparent ${className}`}
        />
      </div>
    )
}