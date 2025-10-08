//@ts-nocheck
/**
 * 
 * **追踪式事件流**
 *
 * @description
 * 需要追踪完整事件流转逻辑的场景，往往是因为单点观察不足以定位问题，而且事件在多个中间环节中被处理、转发、修改，最后的结果无法单纯依赖最终输出解释。
 *
 * **最小的、能体现必要性的场景：**
 * 1. 用户点击按钮，修改pending状态。
 * 2. pending状态变化触发数据请求。
 * 3. 数据请求完成后执行一系列逻辑
 * 问题是: 完全的松散耦合是无法追踪请求状态的,无法在click处追踪事件流
 * 
 *
 * **问题：**
 * 如果只观察第 6 步的埋点事件，你根本不知道它是因为按钮点击触发的，还是因为某个自动刷新逻辑触发的。
 *
 * **解决：**
 * 要准确定位 bug（比如：某些情况下重复提交，导致两次上报），就必须追踪整个事件流：从最初的点击到最后的埋点。
 *
 * **适用场景：**
 * - 分布式系统中的消息队列传递链路。
 * - UI 框架内部从用户交互到渲染更新的链路。
 * - 日志或埋点系统中，追踪某个用户操作到底产生了哪些副作用。
 *
 * **最小可用例子：**
 * 前端一次点击 -> 经过验证 -> 请求 -> 状态更新 -> 渲染 -> 埋点。
 *
 * @example
 * const eventFlow = new ReventFlow();
 *
 * eventFlow.on('start', (data) => {
 *   console.log('Start event received with data:', data);
 * });
 *
 * eventFlow.emit('start', { some: 'data' });
 *
 * eventFlow.off('start');
 *
 * eventFlow.emit('start', { some: 'data' }); // No log, as listener is removed
 *
 * @description
 * ReventFlow 提供了一个简单的事件系统，允许注册、触发和移除事件监听器。
 * 它支持多种事件类型，并且可以传递任意数据给监听器。
 * 该类适用于需要事件驱动架构的场景，如用户交互、数据更新等。
 */
import React from "react";
import { createReaxable } from "./reaxable";
import { reaxper } from 'reaxes-react';
import { obsReaction } from "./Reaxes";


const {store,setState,mutate} = createReaxable({
	pending: false,
	user_input : '',
});

obsReaction(async () => {
	if(store.pending){
		await new Promise(res => setTimeout(res, 2000));
		console.log('User input submitted:', store.user_input);
	}
},() => [store.pending]);

var submit = async () => {
	setState({pending: true});
}

var sumbit = async () => {
	
}

const FormComponent = reaxper(() => {
	return <form>
		<input
			value={store.user_input}
			onChange={e => setState({user_input: e.target.value})}
		/>
		<button
			disabled={store.pending}
			onClick={async e => {
				e.preventDefault();
				if(store.pending) return;
				await submit();
				//从这里起就丢失了事件流的追踪
				dosomethingAfterSubmit();
			}}
		>
			{store.pending ? 'Pending...' : 'Submit'}
		</button>
	</form>
})

