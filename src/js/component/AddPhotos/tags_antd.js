import {
    Tag, Input, Tooltip, Icon,
} from 'antd';
import React, {Component} from "react"
import {connect} from "react-redux"
import actions_addPhotos from "../../actions/addPhotos"

class GeneralTags extends Component {
    constructor(props){
        super(props)
    }
    render() {
        const tags = this.props.tags.map((tag, index)=>{
            const isLongTag = tag.length > 20;
            const tagElem = (
                // close means delete
                <Tag style={{marginTop: "0.5vw"}} color="cyan" key={tag} closable={this.props.closable} id={tag}
                afterClose={() => this.props.handleClose(tag)}
                >
                    {isLongTag ? `${tag.slice(0, 10)}...` : tag}
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
            dispatch(actions_addPhotos.AddPhotosForm_deleteTag(tag))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GeneralTags)