import { memo } from "react";

type Props = {
    loading?: boolean;
    error?: unknown;
    loadingComponent?: React.ReactNode;
}

function LoadingOrError({
    loading: isLoading,
    error,
    loadingComponent,
}: Props) {

    if(isLoading) {
        if(loadingComponent) {
            return (
                <div id="user_defined_loading_component" className="flex items-center justify-center gap-2">
                    {loadingComponent}
                </div>
            )
        }

        return (
            <div id="loadig_container" className="flex flex-col">
                <div id="loading_dots_container" className="flex items-center justify-center gap-2 animate-pulse">
                    <div className="w-1 h-1 bg-gray-600 rounded-full" />
                    <div className="w-1 h-1 bg-gray-600 rounded-full" />
                    <div className="w-1 h-1 bg-gray-600 rounded-full" />
                </div>
                <p id="loading_text" className="text-[10px] text-white font-bold text-center ml-[12px]">Loading...</p>
            </div>
        )
    }

    if(error) {
        console.log(error);
        
        return (
            <div id="error_container" className="text-red-500">
                Somethinng went wrong, Could not load data
            </div>
        )
    }

    return <></>
}

const MemoizedLoadingOrError = memo(LoadingOrError);

export default MemoizedLoadingOrError;