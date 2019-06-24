import * as React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
    width: 100%;
`;

export interface WithErrorsProps {
    context: any;
    parent: any;
}

const ErrorIcon = styled.div`
  display: inline-block;
  height: 3vw;
  margin-right: 1vw;
  padding-right: 0.5vw;
  padding-top: 0.7vw;
  border-right: 0.15vw solid red;
`;

const NoErrorIcon = styled.div`
  display: inline-block;
  height: 3vw;
  margin-right: 1vw;
  padding-right: 0.5vw;
  padding-top: 0.7vw;
  border-right: 0.15vw solid transparent;
`;

interface IconWrapperProps {
    theme: any;
    isVisible: boolean;
}

const IconWrapper = styled.div<IconWrapperProps>`
  color: red;
  opacity: ${(props) => ((props.isVisible) ? (1) : (0))};
`;

const Content = styled.div`
  display: inline-block;
  width: 80%;
`;

const ErrorPopoverLabel = styled.span`
    margin-left: 0.3vw;
    font-weight: bold;
`;

const ErrorContainer = styled.div`
    max-width: 10vw;
`;

export default class WithErrors extends React.Component<WithErrorsProps, undefined> {
    render() {
        const errors = this.props.context.getErrorsForNode(this.props.parent) || [];
        let iconNode = null;
        
        if (errors.length > 0) {
            iconNode = (
                <div>
                    <ErrorContainer>
                        <div>
                            <ErrorPopoverLabel>
                                Error!
                            </ErrorPopoverLabel>
                        </div>
                        {errors[0].message}
                    </ErrorContainer>
                </div>
            );
        }

        return (
            <Wrapper>
                {
                    (errors.length === 0) ? (
                        <NoErrorIcon>
                            {iconNode}
                        </NoErrorIcon>
                    ) : (
                        <ErrorIcon>
                            {iconNode}
                        </ErrorIcon>
                    )
                }
                <Content>
                    {this.props.children}
                </Content>
            </Wrapper>
        );
    }
}