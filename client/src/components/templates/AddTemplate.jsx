/** ***************************************************************
* Copyright 2020 Advanced Distributed Learning (ADL)
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*     http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
**************************************************************** */
import React, { useState, useEffect } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';

import { searchTemplates, selectTemplateResult, deselectTemplateResult, clearTemplateResults, loadProfileTemplates } from "../../actions/templates";
import { editProfileVersion, createNewProfileDraft } from "../../actions/profiles";
import { useSelector, useDispatch } from "react-redux";
import StatementTemplateInfoPanel from '../infopanels/StatementTemplateInfoPanel';
import Flyout from '../controls/flyout';
import ConceptInfoPanel from '../infopanels/ConceptInfoPanel';
import SearchSelectComponent from '../controls/search-select/searchSelectComponent';
import TemplateResultView from './TemplateResultView';

export default function AddTemplate({ isOneTemplateOnly, rootUrl }) {
    const { versionId } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        dispatch(loadProfileTemplates(versionId));
    }, []);

    const templateResults = useSelector((state) => state.searchResults.templates)
    const selectedResults = useSelector((state) => state.searchResults.selectedTemplates)
    const profileVersion = useSelector((state) => state.application.selectedProfileVersion);
    const profileTemplates = useSelector((state) => state.templates);

    const [showTemplateInfopanel, setShowTemplateInfopanel] = useState(false);
    const [infoPanelTemplate, setInfoPanelTemplate] = useState();
    const [showConceptInfopanel, setShowConceptInfopanel] = useState(false);
    const [infoPanelConcept, setInfoPanelConcept] = useState();
    const [hasFlyoutOnPrevious, setHasFlyoutOnPrevious] = useState(false);

    function handleAddToProfileClick() {
        if (selectedResults) {
            const newProfileVersion = Object.assign({}, profileVersion);
            newProfileVersion.templates = [...newProfileVersion.templates, ...selectedResults];

            if (profileVersion.state === 'draft') {
                dispatch(editProfileVersion(newProfileVersion));
            } else if (profileVersion.state === 'published') {
                dispatch(createNewProfileDraft(newProfileVersion));
            }

            dispatch(loadProfileTemplates(versionId));
            history.push(rootUrl);
        }
    }

    function handleCancel() {
        history.goBack();
    }

    function onViewDetailsClick(template) {
        setInfoPanelTemplate(template);
        setShowTemplateInfopanel(true);
    }

    function onFlyoutClose() {
        setShowTemplateInfopanel(false);
        setShowConceptInfopanel(false);
    }

    function onViewConceptClick(concept) {
        setInfoPanelConcept(concept);
        setHasFlyoutOnPrevious(true);
        setShowConceptInfopanel(true);
    }

    function onFlyoutPrevious() {
        setShowConceptInfopanel(false);
        setHasFlyoutOnPrevious(false);
    }

    function templateResultsFilter(result) {
        return !profileTemplates.map(t => t.uuid).includes(result.uuid);
    }

    return (
        <div>
            <div className="grid-row margin-top-3 margin-bottom-3">
                <div className="grid-col">
                    <h2>Add Statement Template</h2>
                </div>
                <div className="grid-col">
                    <Link to={"create"}><button className="usa-button pin-right bottom-2"><i className="fa fa-plus"></i> Create New</button></Link>
                </div>
            </div>

            <SearchSelectComponent
                searchFunction={(searchValues) => dispatch(searchTemplates(searchValues))}
                clearSearchFunction={() => dispatch(clearTemplateResults())}
                searchMessage="Search for existing statement templates"
                searchResults={templateResults && templateResults.filter(t =>templateResultsFilter(t))}
                selectResultFunction={(template) => dispatch(selectTemplateResult(template))}
                removeSelectedResultFunction={(template) => dispatch(deselectTemplateResult(template))}
                clearSelectedResultsFunction={() => dispatch(clearTemplateResults())}
                selectedResults={selectedResults}
                isOneSelectionOnly={isOneTemplateOnly}
                oneSelectionOnlyMessage={"Only one template may be selected for this profile."}
                selectionMessage={`Selected Template${isOneTemplateOnly ? '' : 's'}`}
                resultView={<TemplateResultView onViewDetailsClick={onViewDetailsClick}/>}
            />

            <div className="grid-row">
                <div className="grid-col">
                    <button className="usa-button usa-button--unstyled padding-y-105" onClick={handleCancel}><b>Cancel</b></button>
                </div>
                <div className="grid-col">
                    <button
                            onClick={handleAddToProfileClick}
                            className="usa-button margin-right-0 pin-right"
                            disabled={!(selectedResults && selectedResults.length > 0)}
                    >
                        Add to Profile
                    </button>
                </div>
            </div>
            <Flyout
                    show={showTemplateInfopanel}
                    onClose={onFlyoutClose}
                    hasOnPrevious={hasFlyoutOnPrevious}
                    onPrevious={onFlyoutPrevious}
            >
                { 
                    (showConceptInfopanel && infoPanelConcept)  &&
                        <ConceptInfoPanel concept={infoPanelConcept} />
                }
                {
                    (showTemplateInfopanel && infoPanelTemplate) &&
                    <StatementTemplateInfoPanel infoPanelTemplate={infoPanelTemplate} onViewConceptClick={onViewConceptClick} />
                }
            </Flyout>
        </div>
    );
}