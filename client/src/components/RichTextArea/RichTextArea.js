import React, { Component } from 'react';
import classnames from 'classnames';
import { Editor, EditorState } from 'draft-js';

export const ICON_SET = {
  search: <i className="icon fas fa-search" />,
  user: <i className="icon fas fa-user" />,
};

export const RichTextAreaError = props => {
  const { children } = props;
  return <div className="input__error">{children}</div>;
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

class RichTextArea extends Component {
  constructor(props) {
    super(props);
    this.state = { editorState: EditorState.createEmpty() };
    this.onChange = editorState => this.setState({ editorState });
  }

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
        <Editor
          {...input}
          {...other}
          editorState={this.state.editorState}
          onChange={this.onChange}
          autoFocus={autoFocus}
          className={classnames('richtextarea', touched && error && 'error')}
          type={type}
          onBlur={() => input.onBlur()}
        />

        {label && (
          <RichTextAreaLabel {...meta} dirtyOverride={dirtyOverride}>
            {label}
          </RichTextAreaLabel>
        )}
        {touched && error && <RichTextAreaError>{error}</RichTextAreaError>}
        {icon && ICON_SET[icon]}
      </div>
    );
  }
}

export default RichTextArea;
