export const RC_tic_tac_toe = reaxper( () => {
	const { checkerboard , place , play,store:store$ticTicToe ,winner } = reaxel_tic_tac_toe();
	
	return <div>
		<table style = { {
				width : '150px' ,
				height : '150px' ,
				backgroundColor : winner ? 'gray': 'aqua' ,
				borderCollapse : 'collapse' ,
			} } >
			<tbody>
				{ checkerboard.map( ( row , y ) => {
					return <tr key = { y }>
						{ checkerboard[y].map( ( mesh ,x ) => {
							return <td
								onClick= {() => {
									place({x,y});
								}}
								style = { {
									width : '50px' ,
									height : '50px' ,
									padding : 0 ,
									border : '1px solid gray',
									textAlign : 'center',
									
								} }
								key = { x }
							>
								{ mesh?.description }
							</td>;
						} ) }
					</tr>;
				} ) }
			</tbody>
		</table>
		{typeof winner === "symbol" && <p>
			玩家 {winner.description} 是赢家!
		</p>}
		{winner === "draw" && <p>
			平局!
		</p>}
		{ winner && <button onClick={() => play()}>
			{ winner === true ? '开始游戏' : "再来一盘" }
		</button> }
	</div>;
} );

import { reaxel_tic_tac_toe } from '../reaxel';

