import React, {Component} from "react";
import Logout from "./Logout";

class UserHeader extends Component{
    render() {
        return (
            <div className="w-100 bg-primary d-flex justify-content-between">
                <div className="pt-1 pb-1 col text-white d-flex justify-content-start align-items-center">
                    ЛР4, Вариант 2691
                </div>
                <div className="d-flex align-items-center justify-content-end align-content-center">
                    <Logout {...this.props}/>
                </div>
            </div>
        );
    }
}

export default UserHeader;