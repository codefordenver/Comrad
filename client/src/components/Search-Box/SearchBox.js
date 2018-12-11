import React, { Component } from 'react';

class SearchBox extends Component {



    render() {
        const { searchBoxType } = this.props;
        let searchClass;


        switch (searchBoxType) {
            case "active":
                searchClass = "search";
                break;

            case "disabled":
                searchClass = "search--disabled";
                document.getElementsByClassName("search--disabled").disabled = true;
                break;
        }
        
        return (
            <div className={`${searchClass}`}>
                <span class="fa fa-search"></span>
                <input placeholder="Search" />
            </div>
        )
    }
}

export default SearchBox;