import React , { Component  } from 'react';
import jpg_jkm from '../../../statics/qrcode-green.jpg';
import './index.css';
export const HealthQrcode = class extends Component {
	
	
	componentDidMount () {
		
	}
	
	render () {
		
		return <>
			<div className = "contianer">
				{/*<div className = "below-container">
				 <div className = "green-image"></div>
				 <div className = "white-image">
				 <div className = "link-container">
				 <p>
				 <a
				 href = "#"
				 className = "item"
				 >
				 网络申诉
				 </a>
				 </p>
				 <span className = "link-list">
				 <a
				 href = "#"
				 className = "list"
				 >
				 疫苗接种记录
				 </a>
				 <span className = "content">|</span>
				 <a
				 href = "#"
				 className = "list"
				 >
				 核酸检测结果
				 </a>
				 <span className = "content">|</span>
				 <a
				 href = "#"
				 className = "list"
				 >
				 核酸采样点查询
				 </a>
				 </span>
				 </div>
				 <div className = "health-btn">健康应用</div>
				 <footer>
				 <div>依托全国一体化政务服务平台</div>
				 <div>开展跨省 (区、市) 数据共享和互通互认</div>
				 <div className = "connect">
				 <p>服务热线: 0571-12345-6</p>
				 <p>本服务由杭州市人民政府提供</p>
				 </div>
				 <span className = "lang">
				 <span className = "chinese">中文</span>
				 <span className = "English">/ English</span>
				 </span>
				 
				 </footer>
				 </div>
				 </div>*/ }
				<div className = "above-container">
					<div className = "time">
						<p className = "day">4月06日</p>
						<p className = "clock">20:20:20</p>
					</div>
					<div className = "nav">
						<span className = "nav-left">
							<span className = "name">张*群</span>
							<span
								href = "#"
								className = "item"
							>
								显示
							</span>
						</span>
						
						<span className = "nav-right">
							<span
								href = "#"
								className = "item"
							>
								修改
							</span>
							<span className = "text">|</span>
							<span
								href = "#"
								className = "item"
							>
								代办
							</span>
						</span>
					</div>
					<div className = "info">
						<div className = "title">杭州健康码</div>
						<div className = "health-code">
							<img
								src = {jpg_jkm}
								alt = "二维码"
							/>
						</div>
						<div className = "directions">
							<p>已接种新冠疫苗</p>
							<div className = "details">绿码:凭此码可在浙江省范围内通行，请主动出示，配合检查:并做好自身防护工作，码颜色将根据您的申报由当地政府按照相关政策动态更新，出行前请仔细检查您的健康码</div>
						</div>
						<div className = "route-container">
							<span className = "route-card">
								<span className = "text">行程卡</span>
								<br />
								<p>查看14天是否到过中高风险地区</p>
							</span>
							<span className = "btn">立即查看</span>
						</div>
					</div>
				</div>
			</div>
		</>;
	}
};
