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

import React, { useState } from 'react';
import { Formik, Field } from 'formik';
import * as Yup from 'yup';

import ModalBox from '../controls/modalBox';
import ModalBoxWithoutClose from '../controls/modalBoxWithoutClose';
import ErrorValidation from '../controls/errorValidation';

export default function Translations(props) {
    const [translations, setTranslations] = useState( ( props.field ? props.field.value : [] ) || []);
    const [showModal, setShowModal] = useState(false);
    const [editing, setEditing] = useState(null);
    const [removing, setRemoving] = useState(null)
    const [showRemoveTranslationModal, setShowRemoveTranslationModal] = useState(false);

    function onFormSubmit(values) { 
        let newTranslations = [...translations];

        if (editing) 
            newTranslations[editing.index] = values;
        else
            newTranslations = [...newTranslations, values];

        setTranslations(newTranslations);
        props.form.setFieldValue(props.field.name, newTranslations);
        setShowModal(false);
        setEditing(null);
    }

    function onRemovalConfirmed() {
        if (!removing) return;
        let newTranslations = [...translations];
        newTranslations.splice(removing.index, 1);
        setTranslations(newTranslations);
        props.form.setFieldValue(props.field.name, newTranslations);
        setRemoving(null);
        setShowRemoveTranslationModal(false);
    }

    function onRemovalCanceled() {
        setRemoving(null);
        setShowRemoveTranslationModal(false);
    }

    function onRemove(index) {
        const languageObject = translations[index];
        setRemoving({index: index, language: languageObject.language});
        setShowRemoveTranslationModal(true);
    }

    function onAdd() {
        setEditing(null);
        setShowModal(true)
    }

    function onEdit(index, translation) {
        setEditing({ index: index, translation: translation });
        setShowModal(true);
    }

    function onCancel() {
        setShowModal(false);
        setEditing(null);
    }

    return (<>
        {translations.length > 0 && 
            <div className="grid-row">
                <table style={{margin: '0'}} className="usa-table usa-table--borderless" width="100%">
                    <thead>
                        <tr>
                            <th width="90%" scope="col" style={{padding: '4px'}}></th>
                            <th width="10%" scope="col" style={{padding: '4px'}}></th>
                        </tr>
                    </thead>
                    <tbody> 
                        {translations.map((translation, key) => (
                            <tr key={key}>
                                <th scope="row">
                                    <span>{translation.language}</span>
                                </th>
                                <td><button style={{marginTop: '0'}} className="usa-button  usa-button--unstyled" type="button" onClick={() => onEdit(key, translation)}>
                                    <span className="text-bold">Edit</span>
                                </button></td>
                                <td><button style={{marginTop: '0'}} className="usa-button  usa-button--unstyled" type="button" onClick={() => onRemove(key)}>
                                    <span className="text-bold">Remove</span>
                                </button> </td>
                            </tr>)
                        )}    
                    </tbody>
                </table>
            </div>
        }
        <button className="usa-button usa-button--outline" onClick={onAdd} type='button' style={{marginTop: '8px'}}>Add Translation</button>

        <ModalBoxWithoutClose show={showRemoveTranslationModal}>
            <RemoveTranslationConfirmation langauge={removing} onConfirm={onRemovalConfirmed} onCancel={onRemovalCanceled} />
        </ModalBoxWithoutClose>

        <ModalBox show={showModal} onClose={() => setShowModal(false)}>
            <TranslationForm 
                onSubmit={(values) => onFormSubmit(values)} 
                onCancel={onCancel}
                initialValue={editing ? editing.translation : null} 
            />
        </ModalBox>
    </>)
}

function TranslationForm(props) {

    const languages = ["Lang 1", "Lang 2", "Lang 3"];

    return (
        <Formik
            initialValues={props.initialValue || { translationName: '', translationDesc: '', language: '' }}
            validationSchema={Yup.object({
                language: Yup.string()
                  .required('Required'),
                translationName: Yup.string()
                    .required('Required'),
                translationDesc: Yup.string()
                    .required('Required')
              })}
              onSubmit={(values) => props.onSubmit(values)}
        >
            {({ values, handleSubmit, handleChange }) => (
                <div className="usa-form translation-form">
                    <h2 style={{margin: '0'}}>Add Translation</h2>
                    <div className="grid-row">
                        <div className="grid-col-6" >
                            <ErrorValidation name="language" type="input">
                                <label className="usa-label" htmlFor="language"><span className="text-secondary">*</span>Language</label>
                                <Field
                                        name="language" component="select" value={values.language} onChange={handleChange} rows="3" 
                                        className="usa-select" id="language" aria-required="true"
                                >
                                    <option value="" disabled defaultValue>- Select Language -</option>
                                    {
                                        languages.map((language, key) => (
                                            <option key={key} value={language}>{language}</option>
                                        ))
                                    }
                                </Field>
                            </ErrorValidation>
                        </div>
                    </div>

                    <ErrorValidation name="translationName" type="input">
                        <label className="usa-label" htmlFor="translationName"><span className="text-secondary">*</span>Name</label>
                        <Field name="translationName" component="input" rows="3" className="usa-input" id="translationName" aria-required="true" >
                        </Field>
                    </ErrorValidation>

                    <ErrorValidation name="translationDesc" type="input">
                        <label className="usa-label" htmlFor="translationDesc"><span className="text-secondary">*</span>Description</label>
                        <Field name="translationDesc" component="textarea" rows="3" className="usa-textarea" id="translationDesc" aria-required="true" >
                        </Field>
                    </ErrorValidation>

                    <button className="usa-button submit-button" type="button" onClick={handleSubmit}>Save Language</button> 
                    <button className="usa-button usa-button--unstyled" type="button" onClick={props.onCancel}>
                        <span className="text-bold">Cancel</span>
                    </button>
                </div>)
            }
        </Formik>
    );
}

function RemoveTranslationConfirmation(props) {

    return (<>
        <h2 className="margin-top-0">Remove Translation</h2>
        <div><span>Are you sure you want to remove the translation from this profile?</span></div>
        <button className="usa-button submit-button" type="button" onClick={props.onConfirm}>Remove Translation</button>
        <button className="usa-button usa-button--unstyled" type="button" onClick={props.onCancel}><b>Keep Translation</b></button>
    </>);
}