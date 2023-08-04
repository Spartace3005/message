import React from 'react';
import { useContext } from 'react';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import ImageIcon from '@mui/icons-material/Image';
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import { InputContext } from './inputContext';

const Input: React.FC = () => {
    const inputValue = useContext(InputContext)
    return(
        <div className='input'>
            <input 
            type="text" 
            placeholder="Aa" 
            autoComplete="off" 
            value={inputValue.input}
            onChange={(e) => inputValue.setInput(e.target.value)}
            onKeyPress={(e) => {
                if (e.key === 'Enter') {
                    inputValue.handleSendBtn();
                }
            }}
            />
            <div className='send'>
                <AttachFileIcon className='input-icon'/>
                <input type='file' style={{display: 'none'}} id='file'/>
                <label htmlFor='file'>
                    <ImageIcon className='input-icon'/>
                </label>
                <Button className='send-button' onClick={() => inputValue.handleSendBtn()}>
                    <SendIcon className='input-icon'/>
                </Button>

            </div>
        </div>
    )
}
export default Input;