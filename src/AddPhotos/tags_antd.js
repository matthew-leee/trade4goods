import {
    Tag, Input, Tooltip, Icon,
} from 'antd';
import React, {Component} from "react"
import {connect} from "react-redux"
import actions from "./actions"

class GeneralTags extends Component {
    constructor(props){
        super(props)
        console.log (props)
    }
    render() {
        const tags = this.props.tags.map((tag, index)=>{
            const isLongTag = tag.length > 20;
            const tagElem = (
                // close means delete
                <Tag key={tag} closable={true} id={tag}
                afterClose={() => this.props.handleClose(tag)}
                >
                    {isLongTag ? `${tag.slice(0, 20)}...` : tag}
                </Tag>
            );
            return isLongTag ? <Tooltip title={tag} key={tag}>{tagElem}</Tooltip> : tagElem;
        })
        return (
            <div>
                {tags}
            </div>
        );
    }
}

const mapStateToProps = (state) =>{
    return {

    }
}

const mapDispatchToProps = (dispatch)=>{
    return {
        handleClose: (tag)=>{
            dispatch(actions.AddPhotosForm_deleteTag(tag))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GeneralTags)