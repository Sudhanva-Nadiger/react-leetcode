import '../index.css';

import { memo } from "react";

type Props = {
    loading?: boolean;
    error?: unknown;
    loadingComponent?: React.ReactNode;
}


/**
 * Component for rendering loading state or error state.
 * @param {object} props - The props object.
 * @param {boolean} [props.loading] - Flag indicating whether data is loading.
 * @param {unknown} [props.error] - The error object, if any.
 * @param {React.ReactNode} [props.loadingComponent] - Custom loading component to be displayed.
 * @returns The JSX element representing loading state, error state, or an empty element.
 */
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
            <div id="loading_container" className="flex flex-col">
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