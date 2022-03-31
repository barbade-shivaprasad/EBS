import React, {useState} from 'react';
import MDEditor, {commands} from '@uiw/react-md-editor';
import {
    bold,
    italic,
    hline,
    title,
    link,
    quote,
    emphasize,
    image,
    orderedlist,
    unorderedlist
} from './customTextTools'

const CustomToolbar = ({setDescription}) => {

    const [value, setValue] = useState('Hello Markdown!');

    return (
        <MDEditor
            value={value}
            onChange={(newValue = '') => {setValue(newValue); setDescription(newValue)}}
            textareaProps={{
                placeholder: 'Please enter Markdown text',
            }}
            height={400}
            extraCommands={
                [
                    commands.codeEdit, commands.codeLive, commands.codePreview, commands.divider,
                    commands.fullscreen,
                ]}
            hideToolbar={false}
            commands={
                [
                    bold, italic, hline, title,
                    commands.divider,
                    link, quote, emphasize, image,
                    commands.divider,
                    unorderedlist, orderedlist,
                    commands.group(
                        [commands.title1, commands.title2, commands.title3, commands.title4, commands.title5, commands.title6],
                        {
                            name: 'title',
                            groupName: 'title',
                            buttonProps: {'aria-label': 'Insert title'},
                        },
                    ),
                ]}
        />
    );
};
export default CustomToolbar;
