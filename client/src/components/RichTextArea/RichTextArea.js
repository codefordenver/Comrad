import React, { Component } from 'react';
import classnames from 'classnames';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export const ICON_SET = {
  search: <i className="icon fas fa-search" />,
  user: <i className="icon fas fa-user" />,
};

export const RichTextAreaError = props => {
  const { children } = props;
  return <div className="richtextarea__error">{children}</div>;
};

export const RichTextAreaLabel = props => {
  const {
    active,
    children,
    dirty,
    error,
    initial,
    touched,
    dirtyOverride,
  } = props;

  return (
    <div
      className={classnames(
        'input__label',
        (active || initial) && 'active',
        (dirty || dirtyOverride) && 'dirty',
        touched && error && 'error',
      )}
    >
      {children}
    </div>
  );
};

const CustomToolbar = () => (
  <div id="toolbar">
    <select className="ql-header" defaultValue={''} onChange={e => e.persist()}>
      <option value="2">Large Heading</option>
      <option value="3">Small Heading</option>
      <option />
    </select>
    <button className="ql-bold" />
    <button className="ql-italic" />
    <button className="ql-link" />
  </div>
);

class RichTextArea extends Component {
  constructor(props) {
    super(props);
    this.state = { text: '' };
  }

  handleChange(value) {
    this.setState({ text: value });
  }

  /*modules = {
    toolbar: [
      [{ header: [2, 3, false] }],
      ['bold', 'italic', 'underline'],
      ['link'],
      ['clean'],
    ],
  };*/
  modules = {
    toolbar: {
      container: '#toolbar',
    },
  };

  formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
  ];

  render() {
    const { props } = this;

    const {
      autoFocus,
      className,
      icon,
      inline,
      input,
      label,
      meta,
      type,
      dirtyOverride = false,
      ...other
    } = props;
    const { error, touched } = meta;

    return (
      <div
        className={classnames('form-group', className, {
          'form-group--inline': inline,
        })}
      >
        <div className="editor-container" onClick={this.focus}>
          <ReactQuill
            theme="snow"
            {...input}
            {...other}
            autoFocus={autoFocus}
            ref={element => {
              this.editor = element;
            }}
            className={classnames('richtextarea', touched && error && 'error')}
            type={type}
            onBlur={() => input.onBlur()}
            modules={this.modules}
            formats={this.formats}
            bounds={'.editor-container'}
          />
          <CustomToolbar />

          {label && (
            <RichTextAreaLabel {...meta} dirtyOverride={dirtyOverride}>
              {label}
            </RichTextAreaLabel>
          )}
          {touched && error && <RichTextAreaError>{error}</RichTextAreaError>}
          {icon && ICON_SET[icon]}
        </div>
      </div>
    );
  }
}

export default RichTextArea;
