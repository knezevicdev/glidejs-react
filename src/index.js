import React from 'react';
import Glide from '@glidejs/glide';

const Control = ({ children, dir }) => <button data-glide-dir={dir}>{children}</button>;

class GlideWrapper extends React.Component {
    constructor(props) {
        super(props);
        this.glideRef = React.createRef();
        this.glide = null;
    }

    componentDidMount() {
        this.mount();
    }

    componentWillUnmount() {
        this.unmount();
    }

    componentDidUpdate(prevProps) {
        if (React.Children.count(prevProps.children) !== React.Children.count(this.props.children)) {
            this.unmount();
            this.mount();
        }
    }

    mount = () => {
        const { options, events, onInit } = this.props;
        this.glide = new Glide(this.glideRef.current, options || {});

        if (events) {
            events.forEach(event => {
                this.glide.on(event.event, event.handler);
            });
        }

        this.glide.mount();

        if (onInit) {
            onInit(this.glide);
        }
    }

    unmount = () => {
        this.glide.destroy();
        this.glide = null;
    }

    arrow = (direction) => {
        const { arrows } = this.props;

        if (arrows !== null && typeof arrows === 'object' && arrows[direction]) {
            return arrows[direction];
        }

        return direction;
    }

    render() {
        const { children, arrows, bullets, controls } = this.props;

        return (
            <div className="glide" ref={this.glideRef}>
                <div className="glide__track" data-glide-el="track">
                    <ul className="glide__slides">
                        {children && React.Children.map(children, (child, index) => (
                            <li className="glide__slide" key={`slide#${index}`}>{child}</li>
                        ))}
                    </ul>
                </div>

                {arrows && (
                    <div className="glide__arrows" data-glide-el="controls">
                        <button className="glide__arrow glide__arrow--left" data-glide-dir="<">{this.arrow('prev')}</button>
                        <button className="glide__arrow glide__arrow--right" data-glide-dir=">">{this.arrow('next')}</button>
                    </div>
                )}

                {bullets && (
                    <div className="glide__bullets" data-glide-el="controls[nav]">
                        {children && React.Children.map(children, (child, index) => (
                            <button className="glide__bullet" data-glide-dir={`=${index}`} key={`bullet#${index}`} />
                        ))}
                    </div>
                )}

                {controls && (
                    <div data-glide-el="controls">
                        {controls.map((control, index) => (
                            <Control key={`control#${index}`} dir={control.dir}>{control.content}</Control>
                        ))}
                    </div>
                )}
            </div>
        )
    }
}

export default GlideWrapper;
