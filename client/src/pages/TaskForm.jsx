import React, { useEffect, useState } from 'react';
import { Formik, Form } from 'formik';
import { useTasks } from '../context/TaskContext.jsx'
import { useNavigate, useParams } from 'react-router-dom';
// Components
import Navbar from "../components/Navbar.jsx";
import NotFound from './NotFound.jsx';

export default function TaskForm() {

    const [task, setTask] = useState({
        id: '',
        title: '',
        description: '',
        done: false
    })
    const [error, setError] = useState(false)
    const [shake, setShake] = useState(false)
    const [titleFocused, setTitleFocused] = useState(false)
    const [descriptionFocused, setDescriptionFocused] = useState(false)
    const { createTask, getTask, updateTask } = useTasks();
    const params = useParams();
    const navigate = useNavigate();
    const titleMaxLength = 120;
    const descritpionMaxLength = 2000;

    useEffect(() => {
        const loadTask = async () => {
            if (params.id ) {
                const response = await getTask(params.id);
                if (response.id) {
                    setTask({
                        id: response.id,
                        title: response.title,
                        description: response.description,
                        done: response.done
                    })
                } else setError(response)
            } else {
                setTask({
                    id: '',
                    title: '',
                    description: '',
                    done: false
                })
            }
        }
        loadTask();
    }, [params])

    const handleValidateForm = (errors) => {
        // Si tiene al menos un error, habilitar animación y restablecer el state a false después de medio segundo
        if (Object.keys(errors).length > 0) {
            setShake(true);
            setTimeout(() => {
                setShake(false);
            }, 500);
        }
    }
    const handleCancel = () => {
        if (params.id) {
            return navigate(`/task/${params.id}`)
        }
        return navigate('/')
    }

    const renderForn = () => {
        return (
            <>
                <Navbar />
                <h1 className='text-light text-left font-medium md:font-semibold text-lg md:text-2xl mt-2 mb-4'>{params.id ? 'Edit task' : 'New task'}</h1>

                <Formik
                    initialValues={task}
                    enableReinitialize
                    onSubmit={async (values, actions) => {
                        if (params.id) {
                            await updateTask(params.id, values)
                            navigate(`/task/${params.id}`)
                        } else {
                            const response = await createTask(values);
                            actions.resetForm();
                            navigate(`/task/${response.id}`)
                        }
                    }}
                    validate={values => {
                        const errors = {}
                        if (!values.title) {
                            errors.title = 'You need a title for your task';
                        }
                        if (!values.description) {
                            errors.description = "Don't forget the description";
                        }
                        if (values.description.length > descritpionMaxLength) {
                            errors.description = "Description is too long"
                        }
                        if (values.title.length > titleMaxLength) {
                            errors.title = "Title is too long"
                        }
                        return errors
                    }}
                >
                    {({ values, errors, touched, handleChange, handleSubmit, isSubmitting }) => (
                        <Form onSubmit={handleSubmit}>
                            <div className='relative mb-12 md:mb-10'>
                                <label htmlFor="title" />
                                <span className='text-light text-base font-medium block mb-2'>
                                    Title:
                                </span>
                                <label />
                                <input
                                    type="text"
                                    name="title"
                                    placeholder='Your title'
                                    onChange={handleChange}
                                    onFocus={ () => setTitleFocused(true)}
                                    onBlur={ () => setTitleFocused(false)}
                                    value={values.title}
                                    className={`bg-dark text-light px-3 py-2 md:py-2 md:px-3 text-base md:text-lg border-gray border-2 md:border-[3px] rounded-lg md:rounded-xl w-full focus:outline-none focus:border-light/30 placeholder:text-light/30 ${values.title.length > titleMaxLength ? 'border-amber-400/50 focus:border-amber-400/50' : ''}`}
                                />
                                <div className={`absolute left-0 -bottom-7 text-sm md:text-base ${values.title.length > titleMaxLength ? 'text-amber-400/80' : 'text-red-400'} ${shake ? 'animate-shake' : ''}`}>
                                    {errors.title && touched.title && errors.title}
                                </div>
                                <div className={`absolute right-0 -bottom-7 text-sm md:text-base ${titleFocused ? 'block' : 'hidden'} ${values.title.length > titleMaxLength ? 'text-amber-400/80' : 'text-light'} ${shake ? 'animate-shake' : ''}`}>
                                    {titleMaxLength - values.title.length}
                                </div>
                            </div>
                            <div className='relative mb-12 md:mb-10'>
                                <label htmlFor="description" />
                                <span className='text-light text-base font-medium block mb-2'>
                                    Description:
                                </span>
                                <label />
                                <textarea
                                    type="text"
                                    rows="10"
                                    name="description"
                                    id="description"
                                    placeholder='Write a description'
                                    onChange={handleChange}
                                    onFocus={ () => setDescriptionFocused(true)}
                                    onBlur={ () => setDescriptionFocused(false)}
                                    value={values.description}
                                    className={`bg-dark text-light px-3 py-2 md:py-2 md:px-3 text-base md:text-lg border-gray border-2 md:border-[3px] rounded-lg md:rounded-xl w-full min-h-36 max-h-[40vh] focus:outline-none focus:border-light/30 placeholder:text-light/30 scroll-darkblue ${values.description.length > descritpionMaxLength ? 'border-amber-400/50  focus:border-amber-400/50' : ''}`}
                                />
                                <div className={`absolute left-0 -bottom-6 text-sm md:text-base ${values.description.length > descritpionMaxLength ? 'text-amber-400/80' : 'text-red-400'} ${shake ? 'animate-shake' : ''}`}>
                                    {errors.description && touched.description && errors.description}
                                </div>
                                <div className={`absolute right-0 -bottom-6 text-sm md:text-base ${descriptionFocused ? 'block' : 'hidden'} ${values.description.length > descritpionMaxLength ? 'text-amber-400/80' : 'text-light'}`}>
                                    {descritpionMaxLength - values.description.length}
                                </div>
                            </div>
                            <div className="flex flex-row-reverse items-center justify-start gap-4 md:my-16">
                                <button
                                    className="bg-secondary text-primary hover:bg-cyan-400 border-2 md:border-[3px] border-secondary hover:border-cyan-400 px-4 py-[2px] pb-1 md:px-6 md:py-2 rounded-xl md:rounded-2xl font-semibold text-base md:text-xl outline-none focus:border-[3px] focus:border-cyan-300"
                                    type="submit"
                                    onClick={() => handleValidateForm(errors)}
                                    disabled={isSubmitting}>
                                    Save
                                </button>
                                <button
                                    className='bg-gray text-light hover:bg-cyan-900 border-2 md:border-[3px] border-gray hover:border-cyan-900 px-4 py-[2px] pb-1 md:px-6 md:py-2 rounded-xl md:rounded-2xl font-semibold text-base md:text-xl outline-none focus:border-[3px] focus:border-cyan-800'
                                    type="reset"
                                    onClick={() => handleCancel()}>
                                    Cancel
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </>
        )
    }

    return (
        <div>
            { !error ? renderForn() : <NotFound apiError={error} /> }
        </div>
    )
}