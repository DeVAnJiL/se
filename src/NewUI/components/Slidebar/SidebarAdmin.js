import { Navbar} from "react-bootstrap";
import { connect } from 'react-redux';
import React, {Fragment} from "react";
import NavbarBrand from "reactstrap/es/NavbarBrand";
import './SideBar.css'
import {UncontrolledTooltip} from 'reactstrap';
import * as action from '../../store/actions/teacher';

class SidebarAdmin extends React.Component{
    render()
    {
        return (
            <Navbar  className="myNav flex-column" >

                <NavbarBrand className="myNavBrand text-success" href="/components/">
                    <UncontrolledTooltip placement="right" target="admin">
                        Admin Panel
                    </UncontrolledTooltip>
                    <i className="fa fa-address-card-o text-center" id="admin">   </i>

                </NavbarBrand>

                <NavbarBrand className="myNavBrand text-success" href="/components/">
                    <UncontrolledTooltip placement="right" target="teacher">
                        Teacher Dashboard
                    </UncontrolledTooltip>
                    <i className="fa fa-television text-center" id="teacher"></i>
                </NavbarBrand>
                <NavbarBrand className="myNavBrand text-success" href="/components/">
                    <UncontrolledTooltip placement="right" target="new">
                        Add Teacher/Student Account
                    </UncontrolledTooltip>
                    <i  className="fa fa-plus text-center" id="new"></i>
                </NavbarBrand>
                <NavbarBrand className="myNavBrand text-success" href="/components/">
                    <UncontrolledTooltip placement="right" target="marksentry">
                        Marks Entry
                    </UncontrolledTooltip>
                    <i  className="fa fa-pencil-square-o text-center" id="marksentry" ></i>
                </NavbarBrand>
                <NavbarBrand className="myNavBrand text-success" href="/components/">
                    <UncontrolledTooltip placement="right" target="studentv">
                        Student View
                    </UncontrolledTooltip>
                    <i  className="fa fa-television text-center" id="studentv"></i>
                </NavbarBrand>

            </Navbar>
        );
    }
}

const mapStateToProps = state => {
    return {
    }
};

const mapDispatchToProp = (dispatch) => {
    return {
    }
};

export default connect(mapStateToProps, mapDispatchToProp)(SidebarAdmin);