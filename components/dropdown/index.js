/**
 * WordPress Dependeencies
 */
import { Component } from '@wordpress/element';

/**
 * Internal Dependencies
 */
import Popover from '../popover';

class Dropdown extends Component {
	constructor() {
		super( ...arguments );
		this.toggle = this.toggle.bind( this );
		this.close = this.close.bind( this );
		this.clickOutside = this.clickOutside.bind( this );
		this.bindContainer = this.bindContainer.bind( this );
		this.state = {
			isOpen: false,
		};
	}

	componentWillUnmount() {
		const { isOpen } = this.state;
		const { onToggle } = this.props;
		if ( isOpen && onToggle ) {
			onToggle( false );
		}
	}

	componentWillUpdate( nextProps, nextState ) {
		const { isOpen } = nextState;
		const { onToggle } = nextProps;
		if ( this.state.isOpen !== isOpen && onToggle ) {
			onToggle( isOpen );
		}
	}

	bindContainer( ref ) {
		this.container = ref;
	}

	toggle() {
		this.setState( ( state ) => ( {
			isOpen: ! state.isOpen,
		} ) );
	}

	clickOutside( event ) {
		if ( ! this.container.contains( event.target ) ) {
			this.close();
		}
	}

	close() {
		this.setState( { isOpen: false } );
	}

	render() {
		const { isOpen } = this.state;
		const {
			renderContent,
			renderToggle,
			position = 'bottom',
			className,
			contentClassName,
			expandOnMobile,
		} = this.props;

		const args = { isOpen, onToggle: this.toggle, onClose: this.close };

		return (
			<div className={ className } ref={ this.bindContainer }>
				{ /**
				   * This seemingly redundant wrapper node avoids root return
				   * element styling impacting popover positioning.
				   */ }
				<div>
					{ renderToggle( args ) }
					{ isOpen && (
						<Popover
							className={ contentClassName }
							position={ position }
							onClose={ this.close }
							onClickOutside={ this.clickOutside }
							expandOnMobile={ expandOnMobile }
						>
							{ renderContent( args ) }
						</Popover>
					) }
				</div>
			</div>
		);
	}
}

export default Dropdown;
