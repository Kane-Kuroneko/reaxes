import React , { Component } from 'react';
import "./index.css";

export const TravelCard = class extends Component {
	
	
	componentDidMount () {
	
	}
	
	render () {
		return <>
			<div className = "travel-container">
				<div className = "green-map">
					<div className = "content-title">
						<div className = "headline">通信大数据行程卡</div>
						<div className = "slogan">疫情防控，人人有责</div>
					</div>
					<div className = "information-map">
						<div className = "top-bar"></div>
							
							<div className = "second-bar">
								<div className = "second-text">
									请收下绿色行程卡
								</div>
							</div>
							<div className = "intro">183****1823的动态行程卡</div>
							<div className = "time">更新于:2022.04.22 20:20:10</div>
							<div className = "GIF">
							
							</div>
							<div className = "travel-history">
								<span>您于14天内到达或途经:</span>
								<span className = "place">&nbsp;浙江省杭州市</span>
							</div>
						</div>
						<div className = "explain">结果包含您在前14天到访的国家(地区)与停留4小时以上的国内城市色卡仅对到访地作提醒,不关联健康状况
						</div>
						<div className = "divider">
							<div className = "hr"></div>
							<span>本服务联合提供</span>
							<div className = "hr"></div>
						</div>
						<div className = "service-providers">中国信通院，中国电信，中国移动，中国联通</div>
						<div className = "contact">客服热线：10000/10086/10010</div>
					</div>
					<div className = "white-map">
						<span className = "phonecard">
							<p>一证通查来了!</p>
							<div className = "addition">立即点击进入</div>
						</span>
						<span className = "btn">
							<p>全国移动电话卡"一证通查"</p>
							<div className = "addition">防范诈骗,保护你我</div>
						</span>
					</div>
				
				</div>
			</>
			;
			}
			}

