/** ***********************************************************************
*
* Veracity Technology Consultants
* __________________
*
*  2019 Veracity Technology Consultants
*  All Rights Reserved.
*
* NOTICE:  All information contained herein is, and remains
* the property of Veracity Technology Consultants and its suppliers,
* if any.  The intellectual and technical concepts contained
* herein are proprietary to Veracity Technology Consultants
* and its suppliers and may be covered by U.S. and Foreign Patents,
* patents in process, and are protected by trade secret or copyright law.
* Dissemination of this information or reproduction of this material
* is strictly forbidden unless prior written permission is obtained
* from Veracity Technology Consultants.
*/



import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import TemplateResults from "./TemplateResults";
import { searchTemplates, selectTemplateResult, deselectTemplateResult } from "../../actions/templates";
import { addSelectedTemplateResults } from "../../actions/profiles";
import { useSelector, useDispatch } from "react-redux";
import { Formik } from 'formik';

export default function AddTemplate(props) {

    const templateResults = useSelector((state) => state.searchResults.templates)  
    const selectedResults = useSelector((state) => state.searchResults.selectedTemplates)
    const dispatch = useDispatch();
    
    let history = useHistory();

    let isSelected = (item) => {
        if(!selectedResults) return false;
        return selectedResults.includes(item);
    }

    function handleAddToProfileClick() {
        if (selectedResults) {
            dispatch(addSelectedTemplateResults());
        }
    }

    function handleCancel() {
        history.goBack();
    }

    return (
        <div className="grid-container">
            <div className="grid-row margin-top-3 margin-bottom-3">
                <div className="grid-col">
                    <Link to={props.path}><span className="text-uppercase font-sans-3xs">statement templates</span></Link> <i className="fa fa-angle-right fa-xs"></i>
                    <h2>Add Statement Template</h2>
                </div>
                <div className="grid-col">

                    <Link to={"create"}><button className="usa-button pin-right bottom-2"><i className="fa fa-plus"></i> Create New</button></Link>
                </div>
            </div>
            <div className="border border-base-light margin-bottom-1 minh-tablet">
                <div className="grid-row bg-base-lightest">
                    <div className="grid-col-fill padding-3">
                        <span>Search for existing statement templates</span>

                        <Formik
                            initialValues={{ search: '', }}

                            onSubmit={(values) => {
                                dispatch(searchTemplates(values.search));
                            }}
                        >
                            {({
                                values,
                                handleChange,
                                handleBlur,
                                handleSubmit
                            }) => (
                                    <form className="usa-search" onSubmit={handleSubmit}>
                                        <div role="search">
                                            <label className="usa-sr-only" htmlFor="search-field">Search</label>
                                            <input className="usa-input" id="search-field" type="search" name="search"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.search} />
                                            <button className="usa-button" type="submit">
                                                <span className="usa-search__submit-text">Search</span>
                                            </button>
                                        </div>
                                    </form>

                                )}
                        </Formik>


                    </div>
                </div>
                <div className="grid-row padding-3">
                    <div className="grid-col margin-right-2">
                        <div className="grid-row">
                            <div className="grid-col margin-bottom-2">
                                {
                                    (templateResults && templateResults.length) ? <span className="">{templateResults.length} result{templateResults.length === 1 ? '' : 's'}</span> : " "
                                }
                            </div>
                        </div>
                        <div className="grid-row maxh-tablet">
                            {/* style="overflow-y: auto;max-height: inherit;" */}
                            <div className="grid-col overflow-y-auto" style={{ maxHeight: "inherit" }}>
                                {
                                    // todo: add "n results for 'keyword'"
                                    (templateResults && templateResults.length)
                                        ? templateResults.map((template) => <TemplateResults key={`result${template.uuid}`} template={template} buttonText={(isSelected(template)) ? "Selected" : "Select"} buttonAction={ (template) => dispatch(selectTemplateResult(template))} styles={(isSelected(template) ? "usa-button--outline" : "")} />)
                                        : ""
                                }
                            </div>
                        </div>
                    </div>
                    <div className="grid-col">
                        <div className="grid-row">
                            <div className="grid-col margin-bottom-2">
                                {
                                    (selectedResults && selectedResults.length) ? <span className="text-bold">Selected ({selectedResults.length})</span> : " "
                                }
                            </div>
                        </div>
                        <div className="grid-row maxh-tablet">
                            <div className="grid-col overflow-y-auto" style={{ maxHeight: "inherit" }}>
                                {
                                    // todo: add "n results for 'keyword'"
                                    (selectedResults && selectedResults.length)
                                        ? selectedResults.map((template) => <TemplateResults key={`selected${template.id}`} template={template} buttonText="Remove" buttonAction={(template) => dispatch(deselectTemplateResult(template))} isSelected={() => false} styles="" />)
                                        : ""
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="grid-row">
                <div className="grid-col">
                    <button className="usa-button usa-button--unstyled" onClick={handleCancel}>Cancel</button>
                </div>
                <div className="grid-col">
                    <button onClick={handleAddToProfileClick} className="usa-button pin-right">Add to Profile</button>
                </div>
            </div>
        </div>
    );
}
