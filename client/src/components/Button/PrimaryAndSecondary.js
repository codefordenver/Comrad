import React, { Component } from 'react';

class PrimaryAndSecondary extends Component {

    
    
    render() {
        const { buttonType, children } = this.props;
        let buttonClass;       
        

        switch (buttonType) {
            case "primary":
                buttonClass = "primary--default";
                break;

            case "primaryDisabled":
                buttonClass = "primary--disabled";
                document.getElementsByClassName("primary--disabled").disabled = true;
                break;


            case "secondary":
                buttonClass = "secondary--primary";
                break;
            

            case "secondaryDisabled":
                buttonClass = "secondary--disabled";
                document.getElementsByClassName("secondary--disabled").disabled = true;
                break;

        }
        return (<button className={`button ${buttonClass}`}>{children}</button>)
    }
}

export default PrimaryAndSecondary;