import React from 'react';
import styled from 'styled-components';

const Gears = styled.button`
	background: transparent;
	border: none;
	cursor: pointer;
	
	svg {
		width: 2.5rem;
		padding: 0.25rem;
		height: auto;

		& .icon-gears {
			fill: none;
		}
		& path {
			fill: ${props => props.isOpen ? '#fff' : props.theme.colorPrimary};
		}
		& .gear-1 {
			transform-origin: 226.5px 89px;
		}
		& .gear-2 {
			transform-origin: 86px 139.03px;
		}
		& .gear-3 {
			transform-origin: 152px 236px;
		}
		&:hover .gear-1,
		&:hover .gear-3 {
			animation-duration: 5.6s;
			animation-name: gear-spin;
			animation-iteration-count: infinite;
			animation-timing-function: linear;
		}
		&:hover .gear-2 {
			animation-duration: 5.6s;
			animation-name: gear-spin-reverse;
			animation-iteration-count: infinite;
			animation-timing-function: linear;
		}                    
	}

	@keyframes gear-spin {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}
	@keyframes gear-spin-reverse {
		from {
			transform: rotate(-1deg);
		}
		to {
			transform: rotate(-361deg);
		}
	}
`

const GearToggler = (props) => {
	return (
		<Gears
			isOpen={props.controlPanelOpen}
			onClick={() => props.setControlPanelOpen(!props.controlPanelOpen)}
		>
			<svg class="icon icon-gears" viewBox="0 0 316 290" xmlns="http://www.w3.org/2000/svg">
				<path class="gear-1" fill-rule="evenodd" clip-rule="evenodd" d="M211.464 174.173C211.464 175.334 212.024 176.383 213.135 176.718C215.035 177.292 218.91 178 226.464 178C234.018 178 237.894 177.292 239.794 176.718C240.904 176.383 241.464 175.334 241.464 174.173L241.464 160.457C250.495 158.571 258.913 155.016 266.381 150.13L276.084 159.833C276.905 160.654 278.043 160.999 279.065 160.451C280.814 159.513 284.055 157.274 289.397 151.933C294.738 146.591 296.978 143.35 297.916 141.601C298.464 140.578 298.118 139.44 297.298 138.62L287.594 128.917C292.481 121.449 296.036 113.031 297.922 104L311.638 104C312.798 104 313.847 103.44 314.182 102.329C314.756 100.429 315.464 96.5539 315.464 89C315.464 81.4462 314.756 77.5706 314.182 75.6707C313.847 74.5601 312.798 74 311.638 74L297.922 74C296.036 64.9693 292.481 56.5513 287.594 49.0832L297.298 39.3799C298.118 38.5596 298.464 37.4217 297.916 36.3993C296.978 34.6503 294.738 31.4089 289.397 26.0675C284.055 20.7261 280.814 18.4866 279.065 17.5488C278.043 17.0006 276.905 17.3464 276.084 18.1667L266.381 27.8701C258.913 22.9836 250.495 19.4288 241.464 17.5426L241.464 3.82653C241.464 2.66647 240.904 1.6173 239.794 1.28202C237.894 0.708428 234.018 8.13854e-06 226.464 7.47816e-06C218.91 6.81778e-06 215.035 0.708426 213.135 1.28202C212.024 1.6173 211.464 2.66646 211.464 3.82653L211.464 17.5426C202.434 19.4287 194.016 22.9836 186.548 27.87L176.844 18.1667C176.024 17.3464 174.886 17.0006 173.864 17.5488C172.115 18.4866 168.873 20.7261 163.532 26.0675C158.19 31.4089 155.951 34.6502 155.013 36.3993C154.465 37.4217 154.811 38.5596 155.631 39.3799L165.334 49.0832C160.448 56.5513 156.893 64.9692 155.007 74L141.291 74C140.131 74 139.082 74.5601 138.746 75.6707C138.173 77.5706 137.464 81.4462 137.464 89C137.464 96.5538 138.173 100.429 138.746 102.329C139.082 103.44 140.131 104 141.291 104L155.007 104C156.893 113.031 160.448 121.449 165.334 128.917L155.631 138.62C154.811 139.44 154.465 140.578 155.013 141.601C155.951 143.35 158.19 146.591 163.532 151.933C168.873 157.274 172.115 159.513 173.864 160.451C174.886 160.999 176.024 160.654 176.844 159.833L186.548 150.13C194.016 155.016 202.434 158.571 211.464 160.457L211.464 174.173ZM226.464 41C199.955 41 178.464 62.4903 178.464 89C178.464 115.51 199.955 137 226.464 137C252.974 137 274.464 115.51 274.464 89C274.464 62.4903 252.974 41 226.464 41Z"/>
				<path class="gear-2" fill-rule="evenodd" clip-rule="evenodd" d="M17.9709 145.21C17.0896 145.447 16.4066 146.086 16.3779 146.998C16.3289 148.558 16.5796 151.646 18.1173 157.385C19.655 163.124 20.9822 165.924 21.8047 167.251C22.2855 168.026 23.1966 168.238 24.0779 168.002L34.4983 165.21C37.7695 171.687 42.1838 177.358 47.4163 182.037L42.0198 191.384C41.5636 192.175 41.5325 193.109 42.1571 193.775C43.2257 194.912 45.5869 196.919 50.7321 199.89C55.8774 202.86 58.7958 203.902 60.3155 204.258C61.2038 204.467 61.9979 203.972 62.4541 203.182L67.8506 193.835C74.5189 196.027 81.6379 197.014 88.8826 196.609L91.6748 207.029C91.9109 207.91 92.55 208.593 93.462 208.622C95.0221 208.671 98.1107 208.42 103.849 206.883C109.588 205.345 112.388 204.018 113.715 203.195C114.49 202.715 114.702 201.803 114.466 200.922L111.674 190.502C118.151 187.23 123.823 182.816 128.502 177.584L137.849 182.98C138.639 183.436 139.574 183.467 140.239 182.843C141.377 181.774 143.383 179.413 146.354 174.268C149.325 169.123 150.366 166.204 150.723 164.685C150.931 163.796 150.437 163.002 149.646 162.546L140.299 157.149C142.491 150.481 143.478 143.362 143.073 136.117L153.493 133.325C154.375 133.089 155.058 132.45 155.086 131.538C155.135 129.978 154.885 126.889 153.347 121.151C151.809 115.412 150.482 112.612 149.66 111.285C149.179 110.51 148.268 110.298 147.386 110.534L136.966 113.326C133.695 106.849 129.28 101.177 124.048 96.4985L129.444 87.1514C129.901 86.3612 129.932 85.4263 129.307 84.7612C128.239 83.6233 125.877 81.6167 120.732 78.6461C115.587 75.6755 112.668 74.6339 111.149 74.2774C110.26 74.0691 109.466 74.5634 109.01 75.3536L103.614 84.7007C96.9453 82.5086 89.8264 81.5216 82.5816 81.927L79.7895 71.5066C79.5534 70.6253 78.9143 69.9423 78.0023 69.9136C76.4421 69.8646 73.3536 70.1153 67.6148 71.6531C61.876 73.1908 59.0759 74.5179 57.7493 75.3404C56.9738 75.8212 56.7619 76.7323 56.998 77.6136L59.7901 88.034C53.3133 91.3052 47.6416 95.7195 42.9627 100.952L33.6157 95.5555C32.8255 95.0993 31.8906 95.0682 31.2255 95.6928C30.0876 96.7614 28.081 99.1226 25.1104 104.268C22.1398 109.413 21.0982 112.332 20.7417 113.851C20.5334 114.74 21.0277 115.534 21.8179 115.99L31.165 121.386C28.9729 128.055 27.9858 135.174 28.3913 142.418L17.9709 145.21ZM122.199 129.497C116.802 109.357 96.1008 97.405 75.961 102.801C55.8212 108.198 43.8693 128.899 49.2657 149.039C54.6622 169.179 75.3634 181.131 95.5033 175.734C115.643 170.338 127.595 149.637 122.199 129.497Z"/>
				<path class="gear-3" fill-rule="evenodd" clip-rule="evenodd" d="M128.997 285.76C128.808 286.464 128.978 287.192 129.597 287.576C130.658 288.234 132.895 289.294 137.481 290.523C142.066 291.752 144.534 291.952 145.781 291.913C146.51 291.89 147.021 291.344 147.209 290.64L149.44 282.313C155.229 282.637 160.918 281.848 166.247 280.097L170.559 287.566C170.923 288.197 171.558 288.592 172.268 288.426C173.482 288.141 175.814 287.309 179.925 284.935C184.037 282.561 185.924 280.958 186.778 280.049C187.277 279.517 187.252 278.77 186.887 278.139L182.575 270.67C186.756 266.931 190.284 262.399 192.898 257.223L201.224 259.454C201.928 259.643 202.657 259.474 203.041 258.854C203.698 257.794 204.758 255.556 205.987 250.971C207.216 246.385 207.416 243.917 207.377 242.67C207.354 241.942 206.808 241.431 206.104 241.242L197.778 239.011C198.102 233.222 197.313 227.533 195.561 222.205L203.03 217.893C203.662 217.528 204.057 216.894 203.89 216.184C203.605 214.969 202.773 212.637 200.399 208.526C198.025 204.415 196.422 202.528 195.513 201.674C194.981 201.175 194.234 201.2 193.603 201.564L186.134 205.876C182.395 201.695 177.863 198.168 172.687 195.554L174.919 187.227C175.107 186.523 174.938 185.795 174.318 185.411C173.258 184.754 171.021 183.693 166.435 182.464C161.849 181.236 159.381 181.035 158.135 181.074C157.406 181.097 156.895 181.643 156.706 182.347L154.475 190.674C148.686 190.35 142.998 191.139 137.669 192.89L133.357 185.421C132.992 184.79 132.358 184.395 131.648 184.561C130.434 184.846 128.102 185.679 123.99 188.052C119.879 190.426 117.992 192.029 117.138 192.939C116.639 193.47 116.664 194.217 117.028 194.849L121.341 202.318C117.16 206.056 113.632 210.588 111.018 215.764L102.692 213.533C101.987 213.344 101.259 213.514 100.875 214.133C100.218 215.193 99.1573 217.431 97.9286 222.016C96.6998 226.602 96.4995 229.07 96.5386 230.317C96.5615 231.046 97.1073 231.556 97.8116 231.745L106.138 233.976C105.814 239.765 106.603 245.454 108.355 250.782L100.886 255.094C100.254 255.459 99.8592 256.094 100.026 256.803C100.31 258.018 101.143 260.35 103.517 264.461C105.89 268.573 107.494 270.459 108.403 271.313C108.934 271.812 109.681 271.788 110.313 271.423L117.782 267.111C121.521 271.292 126.053 274.819 131.228 277.433L128.997 285.76ZM159.766 207.354C143.673 203.042 127.131 212.592 122.818 228.686C118.506 244.779 128.057 261.321 144.15 265.633C160.243 269.945 176.785 260.395 181.097 244.301C185.409 228.208 175.859 211.666 159.766 207.354Z"/>
			</svg>
		</Gears>
	);
}

export default GearToggler;