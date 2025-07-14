export const GridFormat = ({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div
    className={`w-[108px] text-muted-foreground border border-transparent border-r-border ${className}`}
  >
    {children}
  </div>
);

export default GridFormat;
