import React, { Component } from 'react'


class Alert extends Component {
    render() {
        const {alertType, title, children} = this.props; 
        let iconType;
        
        switch(alertType){
            case "warning": 
                iconType = "fa-times-circle";
                break;
            case "info":
                iconType = "fa-info-circle";
                break;
            case "success":
                iconType = "fa-check-circle";
                break;
            case "error":
                iconType = "fa-exclamation-circle";
                break;                

        } 
        return (
            <div className={`alert--${alertType} alert`}>
                <div className="alert__symbol">
                    <i className={`fas ${iconType} fa-2x`}></i>
                </div>
                <div className="alert__title-body">
                    <span  className="alert__text-title">{title}</span>
                    <br />
                    <span className="alert__text-body">{children}</span>
                </div>
            </div>
        )
    }
}

export default Alert;