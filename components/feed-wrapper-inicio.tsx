type Props = {
    children: React.ReactNode;
};

export const FeedWrapperInicio = ({ children }: Props) => {
    return (
        <div className="flex-1 relative lg:top-0 pb-10">
            {children}
        </div>
    );
};