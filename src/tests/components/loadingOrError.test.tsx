import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import LoadingOrError from '../../components/LoadingOrError'

describe("Tests for loading or error component", () => {
    it("Should render loading ui", () => {
        const { container } = render(<LoadingOrError loading={true} />);
        const loadingContainer = container.querySelector("#loading_container");
        expect(loadingContainer).toBeInTheDocument();

        const loadingText = screen.getByText("Loading...");
        expect(loadingText).toBeInTheDocument();
    })

    it("Should render user defined loading component", () => {
        const { container } = render(<LoadingOrError loading={true} loadingComponent={<div/>} />);
        const userDefinedLoadingComponent = container.querySelector("#user_defined_loading_component");
        const loadingContainer = container.querySelector("#loading_container");
        expect(loadingContainer).not.toBeInTheDocument();
        expect(userDefinedLoadingComponent).toBeInTheDocument();
    })

    it("Should render error ui", () => {
        const { container } = render(<LoadingOrError error={true} />);

        const errorContainer = container.querySelector("#error_container");
        expect(errorContainer).toBeInTheDocument();

        const errorTest = screen.getByText("Somethinng went wrong, Could not load data");
        expect(errorTest).toBeInTheDocument();
    })

    it("Should not render anything", () => {
        const { container } = render(<LoadingOrError />);
        expect(container).toBeEmptyDOMElement();
    })
})