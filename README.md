## API

### useDrag

用于将当前组件用作拖动源的钩子。

```js
import { useDrag } from 'react-dnd'

function DraggableComponent(props) {
  const [collectedProps, drag] = useDrag({
    item: { id, type }
  })
  return <div ref={drag}>...</div>
}
```
#### 参量

spec规范对象，有关如何构造此对象的详细信息，请参见下文

#### 返回值数组

Index 0：一个对象，其中包含从collect函数收集的属性。如果collect未定义函数，则返回一个空对象。

Index 1：拖动源的连接器功能。这必须附加到DOM的可拖动部分。

Index 2：用于拖动预览的连接器功能。这可以附加到DOM的预览部分。

#### 规范对象成员

`item`：必填。一个普通的JavaScript对象，描述了要拖动的数据。这是可用于放置目标的有关拖动源的唯一信息，因此选择它们需要知道的最少数据非常重要。您可能会想在此处添加一个复杂的参考，但是您应该尽力避免这样做，因为它会将拖动源和放置目标结合在一起。{ type, id }从此方法返回类似的内容是个好主意。

`item.type`必须设置，并且必须是字符串，ES6符号。只有注册为相同类型的放置目标才会对此项目做出反应。阅读概述以了解有关项目和类型的更多信息。

previewOptions： 可选的。描述拖动预览选项的普通JavaScript对象。

options： 可选的。一个普通的对象。如果组件的某些道具不是标量的（即不是原始值或函数），则arePropsEqual(props, otherProps)在options对象内部指定自定义函数可以提高性能。除非您有性能问题，否则不要担心。

begin(monitor)： 可选的。拖动操作开始时触发。不需要返回任何内容，但是如果返回对象，它将覆盖item规范的默认属性。

end(item, monitor)： 可选的。当拖动停止时，end被调用。对于每个begin呼叫，end都会保证有一个对应的呼叫。您可以致电monitor.didDrop()检查是否由兼容的放置目标处理了放置。如果处理了该对象，并且放置目标通过从其方法返回一个普通对象指定了放置结果drop()，则它将作为可用monitor.getDropResult()。此方法是触发磁通动作的好地方。注意：如果拖动时卸载了组件，则将component参数设置为null。

canDrag(monitor)： 可选的。使用它可以指定当前是否允许拖动。如果要始终允许它，则只需忽略此方法。如果您想基于over的谓词禁用拖动，则指定它很方便props。注意：您不能monitor.canDrag()在此方法内调用。

isDragging(monitor)： 可选的。默认情况下，只有启动拖动操作的拖动源才被视为拖动。您可以通过定义自定义isDragging方法来覆盖此行为。它可能会返回类似的信息props.id === monitor.getItem().id。如果原始组件可能在拖动过程中被卸载，然后又与其他父对象“复活”，则执行此操作。例如，在看板中的列表中移动卡时，您希望它保持拖动的外观-即使从技术上讲，每次将其移动到另一个列表时，该组件都会被卸载，而另一个组件也将被挂载。注意：您不能monitor.isDragging()在此方法内调用。

collect： 可选的。收集功能。它应该返回道具的简单对象以返回注入到组件中。它接收两个参数，monitor和props。阅读概述以获取有关监视器和收集功能的介绍。请参阅下一节中详细描述的收集功能。

### useDrop

使用当前组件作为放置目标的钩子。

```js
import { useDrop } from 'react-dnd'

function myDropTarget(props) {
  const [collectedProps, drop] = useDrop({
    accept
  })

  return <div ref={drop}>Drop Target</div>
}
```

#### 参量

spec规范对象，有关如何构造此对象的详细信息，请参见下文

#### 返回值数组

Index 0：一个对象，其中包含从collect函数收集的属性。如果collect未定义函数，则返回一个空对象。

Index 1：放置目标的连接器功能。这必须附加到DOM的放置目标部分。

#### 规范对象成员

accept：必填。字符串，ES6符号，其中一个的数组或返回给定组件的其中一个的函数props。此放置目标将仅对由指定类型的拖动源产生的项目作出反应。阅读概述以了解有关项目和类型的更多信息。

options： 可选的。一个普通的对象。如果组件的某些道具不是标量的（即不是原始值或函数），则arePropsEqual(props, otherProps)在options对象内部指定自定义函数可以提高性能。除非您有性能问题，否则不要担心。

drop(item, monitor)： 可选的。当兼容项目放在目标上时调用。您可以返回undefined或纯对象。如果返回一个对象，它将成为放置结果，并且可用于其拖动源中的endDrag方法monitor.getDropResult()。如果您要根据接收到目标的目标执行不同的操作，这很有用。如果您有嵌套的放置目标，则可以drop通过检查monitor.didDrop()和来测试嵌套目标是否已经处理monitor.getDropResult()。此方法和源endDrag方法都是触发Flux动作的好地方。如果canDrop()已定义并返回，则不会调用此方法false。

hover(item, monitor)： 可选的。将项目悬停在组件上时调用。您可以检查monitor.isOver({ shallow: true })测试悬停是否发生过只是当前的目标，或通过嵌套一个。与drop()此方法不同的是，即使canDrop()已定义并返回该方法也将被调用false。您可以检查monitor.canDrop()是否是这种情况。

canDrop(item, monitor)： 可选的。使用它来指定放置目标是否能够接受该物品。如果要始终允许它，则只需忽略此方法。如果您想基于overprops或谓词来禁用丢弃，则指定它很方便monitor.getItem()。注意：您不能monitor.canDrop()在此方法内调用。

collect： 可选的。收集功能。它应该返回道具的简单对象以返回注入到组件中。它接收两个参数，monitor和props。阅读概述以获取有关监视器和收集功能的介绍。请参阅下一节中详细描述的收集功能。

### useDragLayer

用于将当前组件用作拖动层的钩子。

```js
import { useDragLayer } from 'react-dnd'

function DragLayerComponent(props) {
  const collectedProps = useDragLayer(spec)
  return <div>...</div>
}
```

#### 参量
collect：必填。收集功能。它应该返回道具的简单对象以返回注入到组件中。它接收两个参数，`monitor`和`props`。阅读概述以获取有关监视器和收集功能的介绍。请参阅下一节中详细描述的收集功能。

#### 返回值

从collect函数收集的属性的对象。

### DndProvider

DndProvider组件为您的应用程序提供React-DnD功能。必须通过backend道具将其注入后端，但是也可以将其注入window对象。

#### 用法

```js
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'

export default class YourApp {
  render() {
    return (
      <DndProvider backend={HTML5Backend}>
        /* Your Drag-and-Drop Application */
      </DndProvider>
    )
  }
}
```

#### 道具
backend：必填。一个React DnD后端 除非您要编写自定义代码，否则您可能要使用React DnD随附的HTML5后端。

context： 可选的。用于配置后端的后端上下文。这取决于后端的实现。

options： 可选的。用于配置后端的选项对象。这取决于后端的实现。

### DragPreviewImage

将HTML Image元素呈现为断开的拖动预览的组件。

#### 用法

```js
import { DragSource, DragPreviewImage } from 'react-dnd'

function DraggableHouse({ connectDragSource, connectDragPreview }) {
  return (
    <>
      <DragPreviewImage src="house_dragged.png" connect={connectDragPreview} />
      <div ref={connectDragSource}>🏠</div>
    </>
  )
}
export default DragSource(
  /* ... */
  (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview()
  })
)
```

#### 道具
connect：必填。拖动预览连接器功能

---

## 监控状态

### DragSourceMonitor

`DragSourceMonitor是传递给的收集功能的对象DragSource`。它的方法使您可以获得有关特定拖动源的拖动状态的信息。绑定到该监视器的特定拖动源在下面称为监视器的所有者。

### 方法
canDrag()：true如果没有正在进行的拖动操作，并且所有者的canDrag()返回true或未定义，则返回。

isDragging()：返回true是否正在进行拖动操作，并且所有者发起了拖动，或者isDragging()定义了其并返回true。

getItemType()：返回一个字符串或一个ES6符号，用于标识当前拖动项目的类型。null如果没有项目被拖动，则返回。

getItem()：返回表示当前拖动项目的普通对象。每个拖动源都必须通过从其beginDrag()方法返回一个对象来指定它。null如果没有项目被拖动，则返回。

getDropResult()：返回表示最后记录的放置结果的普通对象。放置目标可以选择通过从其drop()方法返回对象来指定它。drop()自下而上为嵌套目标调度链时，任何从其显式返回其自身结果的父对象将drop()覆盖该子对象先前设置的子对象放置结果。返回null如果在外部调用endDrag()。

didDrop()true如果某个放置目标已经处理了放置事件，false则返回，否则返回。即使目标未返回放置结果，也didDrop()将返回true。在内部使用它endDrag()来测试是否有任何放置目标已处理了放置。返回false如果在外部调用endDrag()。

getInitialClientOffset()：返回{ x, y }当前拖动操作开始时指针的客户端偏移量。null如果没有项目被拖动，则返回。

getInitialSourceClientOffset()：返回{ x, y }当前拖动操作开始时拖动源组件的根DOM节点的客户端偏移量。null如果没有项目被拖动，则返回。

getClientOffset()：返回{ x, y }正在进行拖动操作时指针的最后记录的客户端偏移量。null如果没有项目被拖动，则返回。

getDifferenceFromInitialOffset()：返回{ x, y }当前拖动操作开始时指针的最后记录的客户端偏移量与客户端偏移量之间的差。null如果没有项目被拖动，则返回。

getSourceClientOffset()：{ x, y }根据当前拖动操作开始时的位置和移动差异，返回拖动源组件的根DOM节点的预计客户端偏移量。null如果没有项目被拖动，则返回。

### DropTargetMonitor
`DropTargetMonitor是传递给的收集功能的对象DropTarget`。它的方法使您可以获得有关特定放置目标的拖动状态的信息。绑定到该监视器的特定放置目标在下面称为监视器的所有者。

###方法
canDrop()：返回true是否正在进行拖动操作，并且所有者的canDrop()返回true或未定义。

isOver(options)：返回true是否正在进行拖动操作，并且指针当前悬停在所有者上。您可以选择通过{ shallow: true }以严格检查是否仅将所有者悬停，而不是嵌套目标。

getItemType()：返回一个字符串或一个ES6符号，用于标识当前拖动项目的类型。null如果没有项目被拖动，则返回。

getItem()：返回表示当前拖动项目的普通对象。每个拖动源都必须通过从其beginDrag()方法返回一个对象来指定它。null如果没有项目被拖动，则返回。

getDropResult()：返回表示最后记录的放置结果的普通对象。放置目标可以选择通过从其drop()方法返回对象来指定它。drop()自下而上为嵌套目标调度链时，任何显式返回其自身结果的父对象将drop()覆盖子对象先前设置的放置结果。返回null如果在外部调用drop()。

didDrop()true如果某个放置目标已经处理了放置事件，false则返回；否则返回。即使目标未返回放置结果，也didDrop()将返回true。在内部使用它drop()来测试是否有任何嵌套的放置目标已经处理了放置。返回false如果在外部调用drop()。

getInitialClientOffset()：返回{ x, y }当前拖动操作开始时指针的客户端偏移量。null如果没有项目被拖动，则返回。

getInitialSourceClientOffset()：返回{ x, y }当前拖动操作开始时拖动源组件的根DOM节点的客户端偏移量。null如果没有项目被拖动，则返回。

getClientOffset()：返回{ x, y }正在进行拖动操作时指针的最后记录的客户端偏移量。null如果没有项目被拖动，则返回。

getDifferenceFromInitialOffset()：返回{ x, y }当前拖动操作开始时指针的最后记录的客户端偏移量与客户端偏移量之间的差。null如果没有项目被拖动，则返回。

getSourceClientOffset()：{ x, y }根据当前拖动操作开始时的位置和移动差异，返回拖动源组件的根DOM节点的预计客户端偏移量。null如果没有项目被拖动，则返回。

### DragLayerMonitor
DragLayerMonitor是传递给的收集功能的对象DragLayer。它的方法使您可以获得有关全局拖动状态的信息。

### 方法
isDragging()：返回true是否正在进行拖动操作。false否则返回。

getItemType()：返回一个字符串或一个ES6符号，用于标识当前拖动项目的类型。null如果没有项目被拖动，则返回。

getItem()：返回表示当前拖动项目的普通对象。每个拖动源都必须通过从其beginDrag()方法返回一个对象来指定它。null如果没有项目被拖动，则返回。

getInitialClientOffset()：返回{ x, y }当前拖动操作开始时指针的客户端偏移量。null如果没有项目被拖动，则返回。

getInitialSourceClientOffset()：返回{ x, y }当前拖动操作开始时拖动源组件的根DOM节点的客户端偏移量。null如果没有项目被拖动，则返回。

getClientOffset()：返回{ x, y }正在进行拖动操作时指针的最后记录的客户端偏移量。null如果没有项目被拖动，则返回。

getDifferenceFromInitialOffset()：返回{ x, y }当前拖动操作开始时指针的最后记录的客户端偏移量与客户端偏移量之间的差。null如果没有项目被拖动，则返回。

getSourceClientOffset()：{ x, y }根据当前拖动操作开始时的位置和移动差异，返回拖动源组件的根DOM节点的预计客户端偏移量。null如果没有项目被拖动，则返回。

## 旧版装饰器 API

DragSource
包装您的组件DragSource以使其可拖动。DragSource是接受三个必需参数的高阶组件。它们在下面详细描述。

要使用DragSource，请不要忘记将应用程序的顶级组件包装在中DragDropContext。

### 签名
DragSource使用部分应用程序。在第一个调用中指定其参数之后，您需要将React组件类作为第二个调用中的唯一参数传递。该签名DragSource可用作装饰器。阅读概述以获得有关装饰器和高阶组件的更详细说明。

```js
import { DragSource } from 'react-dnd'

class MyComponent {
  /* ... */
}

export default DragSource(type, spec, collect)(MyComponent)
```

### 参数
type：必填。字符串，ES6符号或返回给定组件的的函数props。只有注册为相同类型的放置目标才会对此拖动源产生的项目做出反应。阅读概述以了解有关项目和类型的更多信息。

spec：必填。一个普通的JavaScript对象，上面带有一些允许的方法。它描述了拖动源如何响应拖放事件。请参阅下一节中详细描述的拖动源规范。

collect：必填。收集功能。它应该返回道具的普通对象以注入到您的组件中。它接收两个参数：connect和monitor。阅读概述，以获取有关监视器，接口和收集功能的介绍。请参阅下一节后面详细描述的收集功能。

options： 可选的。一个普通的对象。如果组件的某些道具不是标量的（即不是原始值或函数），则arePropsEqual(props, otherProps)在options对象内部指定自定义函数可以提高性能。除非您有性能问题，否则不要担心。

### 拖动源规范
第二个spec参数必须是实现拖动源规范的普通对象。下面是它可能具有的所有方法的列表。

### 规格方法
beginDrag(props, monitor, component)：必填。开始拖动时，将beginDrag被调用。您必须返回一个纯JavaScript对象，该对象描述要拖动的数据。返回的内容是可用于放置目标的唯一有关拖动源的信息，因此选择它们需要知道的最少数据非常重要。您可能很想在其中添加一个引用component，但是您应该尽力避免这样做，因为它将拖动源和放置目标耦合在一起。{ id: props.id }从此方法返回类似的内容是个好主意。

endDrag(props, monitor, component)： 可选的。当拖动停止时，endDrag被调用。对于每个beginDrag呼叫，endDrag都会保证有一个相应的呼叫。您可以致电monitor.didDrop()检查是否由兼容的放置目标处理了放置。如果处理了该对象，并且放置目标通过从其方法返回一个普通对象指定了放置结果drop()，则它将作为monitor.getDropResult()。此方法是触发磁通动作的好地方。注意：如果拖动时卸载了组件，则将component参数设置为null。

canDrag(props, monitor)： 可选的。使用它可以指定当前是否允许拖动。如果要始终允许它，则忽略此方法。如果您想基于over的谓词禁用拖动，则指定它很方便props。注意：您不能monitor.canDrag()在此方法内调用。

isDragging(props, monitor)： 可选的。默认情况下，只有启动拖动操作的拖动源才被视为拖动。您可以通过定义自定义isDragging方法来覆盖此行为。它可能会返回类似的信息props.id === monitor.getItem().id。如果原始组件可能在拖动过程中被卸载，然后又与其他父对象“复活”，则执行此操作。例如，在看板中的列表中移动卡时，您希望它保持拖动的外观-即使从技术上讲，每次将其移动到另一个列表时，该组件都会被卸载，而另一个组件也将被挂载。注意：您不能monitor.isDragging()在此方法内调用。

### 规格方法参数
props：组件的当前道具。

monitor：的实例DragSourceMonitor。使用它来查询有关当前拖动状态的信息，例如当前拖动的项目及其类型，当前和初始坐标和偏移以及是否已删除它。阅读DragSourceMonitor文档以获取完整的monitor方法列表，或阅读概述以获取有关监视器的介绍。

component：指定时，它是组件的实例。使用它来访问底层DOM节点以进行位置或大小测量，或调用setState和其他组件方法。由于实例可能在调用它们之前不可用isDragging，canDrag因此故意丢失了它。如果您希望这些方法取决于组件的状态，请考虑将状态提升到父组件，以便可以使用props。通常，如果您愿意的话，代码会更干净props。

### 收集功能
只要指定拖动源type和spec是不是很够。
还有更多需要我们注意的事情：

- 将React DnD事件处理程序连接到组件中的某个节点；

- 将有关拖动状态的一些知识传递给我们的组件。
  
React组件之间的所有通信都是通过props进行的，因此React DnD将特殊的props注入到您的组件中是有意义的。但是，它使您可以自由命名它们并决定组件将接收的道具。

React DnD将使用一个连接器来调用您的收集功能，该连接器使您可以将节点连接到DnD后端，并使用一个监视器来查询有关拖动状态的信息。它应该返回道具的普通对象以注入到您的组件中。

如果您不熟悉这些概念，则概述应该为您提供一个很好的主意。

### 参数
connect：的实例DragSourceConnector。它有两种方法：dragPreview()和dragSource()。其中，dragSource()是您最常使用的一种。它返回一个函数，您需要将该函数传递给组件以将源DOM节点连接到React DnD后端。如果{ connectDragSource: connect.dragSource() }从collect函数中返回类似的内容，该组件将connectDragSource作为道具接收，因此您可以将其内部的相关节点标记render()为可拖动：return this.props.connectDragSource(<div>...</div>)。您可以在此文件末尾的示例中看到此模式的实际作用。阅读DragSourceConnector文档以获取connect方法的完整列表，或阅读概述以获取连接器的简介。

monitor：的实例DragSourceMonitor。与monitor在拖动源指定方法中收到的结果完全相同，您可以使用它来查询有关当前拖动状态的信息。阅读DragSourceMonitor文档以获取完整的monitor方法列表，或阅读概述以获取有关监视器的介绍。

props：组件的当前道具

### 返回值
DragSource包装您的组件并返回另一个React组件。
为了简化测试，它提供了一个API来深入了解内部：

#### 静态特性
DecoratedComponent：返回包装的组件类型。

#### 实例方法
getDecoratedComponentInstance()：返回包装的组件实例。

getHandlerId()：返回拖动源ID，该ID可用于模拟测试后端的拖放事件。有关用法示例，请参考测试教程。

### 嵌套行为
如果一个拖动源嵌套在另一个拖动源中，则兼容类型的最里面的拖动源将获胜。false从中返回的拖动源将canDrag被跳过。选定的拖动源是唯一将接收beginDrag到的，然后是endDrag。确定阻力源后就不会传播。

### 例
查看教程以获取更多真实示例！

```js
import React from 'react'
import { DragSource } from 'react-dnd'

// Drag sources and drop targets only interact
// if they have the same string type.
// You want to keep types in a separate file with
// the rest of your app's constants.
const Types = {
  CARD: 'card'
}

/**
 * Specifies the drag source contract.
 * Only `beginDrag` function is required.
 */
const cardSource = {
  canDrag(props) {
    // You can disallow drag based on props
    return props.isReady
  },

  isDragging(props, monitor) {
    // If your component gets unmounted while dragged
    // (like a card in Kanban board dragged between lists)
    // you can implement something like this to keep its
    // appearance dragged:
    return monitor.getItem().id === props.id
  },

  beginDrag(props, monitor, component) {
    // Return the data describing the dragged item
    const item = { id: props.id }
    return item
  },

  endDrag(props, monitor, component) {
    if (!monitor.didDrop()) {
      // You can check whether the drop was successful
      // or if the drag ended but nobody handled the drop
      return
    }

    // When dropped on a compatible target, do something.
    // Read the original dragged item from getItem():
    const item = monitor.getItem()

    // You may also read the drop result from the drop target
    // that handled the drop, if it returned an object from
    // its drop() method.
    const dropResult = monitor.getDropResult()

    // This is a good place to call some Flux action
    CardActions.moveCardToList(item.id, dropResult.listId)
  }
}

/**
 * Specifies which props to inject into your component.
 */
function collect(connect, monitor) {
  return {
    // Call this function inside render()
    // to let React DnD handle the drag events:
    connectDragSource: connect.dragSource(),
    // You can ask the monitor about the current drag state:
    isDragging: monitor.isDragging()
  }
}

class Card {
  render() {
    // Your component receives its own props as usual
    const { id } = this.props

    // These props are injected by React DnD,
    // as defined by your `collect` function above:
    const { isDragging, connectDragSource } = this.props

    return connectDragSource(
      <div>
        I am a draggable card number {id}
        {isDragging && ' (and I am being dragged now)'}
      </div>
    )
  }
}

export default DragSource(Types.CARD, cardSource, collect)(Card)
```

DropTarget
包装您的组件，DropTarget以使其对在其上拖动，悬停或放下的兼容项目做出反应。DropTarget是一个高阶组件。

要使用DropTarget，请不要忘记将应用程序的顶级组件包装在中DragDropContext。

### 签名
DropTarget使用部分应用程序。在第一个调用中指定其参数之后，您需要将React组件类作为第二个调用中的唯一参数传递。该签名DropTarget可用作装饰器。阅读概述以获得有关装饰器和高阶组件的更详细说明。

```js
import { DropTarget } from 'react-dnd'

class MyComponent {
  /* ... */
}

export default DropTarget(types, spec, collect)(MyComponent)
```

### 参量
types：必填。字符串，ES6符号，其中一个的数组或返回给定组件的其中一个的函数props。此放置目标将仅对由指定类型的拖动源产生的项目作出反应。阅读概述以了解有关项目和类型的更多信息。

spec：必填。一个普通的JavaScript对象，上面带有一些允许的方法。它描述了放置目标如何响应拖放事件。请参阅下一节中详细描述的放置目标规范。

collect：必填。收集功能。它应该返回道具的普通对象以注入到您的组件中。它接收两个参数：connect和monitor。阅读概述，以获取有关监视器，接口和收集功能的介绍。请参阅下一节后面详细描述的收集功能。

options： 可选的。一个普通的对象。如果组件的某些道具不是标量的（即不是原始值或函数），则arePropsEqual(props, otherProps)在options对象内部指定自定义函数可以提高性能。除非您有性能问题，否则不要担心。

### 落下目标规格
第二个spec参数必须是实现放置目标规范的普通对象。下面是它可能具有的所有方法的列表。

#### 规格方法
drop(props, monitor, component)： 可选的。当兼容项目放在目标上时调用。您可以返回undefined或纯对象。如果返回一个对象，它将成为放置结果，并且可用于其拖动源中的endDrag方法monitor.getDropResult()。如果您要根据接收到目标的目标执行不同的操作，这很有用。如果您有嵌套的放置目标，则可以drop通过检查monitor.didDrop()和来测试嵌套目标是否已经处理monitor.getDropResult()。此方法和源endDrag方法都是触发Flux动作的好地方。如果canDrop()已定义并返回，则不会调用此方法false。

hover(props, monitor, component)： 可选的。将项目悬停在组件上时调用。您可以检查monitor.isOver({ shallow: true })测试悬停是否发生过唯一的当前目标，或通过嵌套一个。与drop()此方法不同的是，即使canDrop()已定义并返回该方法也将被调用false。您可以检查monitor.canDrop()是否存在这种情况。

canDrop(props, monitor)： 可选的。使用它来指定放置目标是否能够接受该物品。如果要始终允许它，则忽略此方法。如果您想基于overprops或谓词来禁用丢弃，则指定它很方便monitor.getItem()。注意：您不能monitor.canDrop()在此方法内调用。
**该规范没有提供按目的处理进入或离开事件的方法**。相反，monitor.isOver()从您的collection函数返回调用结果，以便您可以使用componentDidUpdateReact钩子来处理组件中的进入和离开事件。您还可以检查monitor.isOver({ shallow: true })是否不希望嵌套放置目标计数。

#### 规格方法参数
props：组件的当前道具。

monitor：的实例DropTargetMonitor。使用它可以查询有关当前拖动状态的信息，例如当前拖动的项目及其类型，当前和初始坐标和偏移，是否在当前目标上以及是否可以将其删除。阅读DropTargetMonitor文档以获取完整的monitor方法列表，或阅读概述以获取有关监视器的介绍。

component：指定时，它是组件的实例。使用它来访问底层DOM节点以进行位置或大小测量，或调用setState和其他组件方法。有目的地缺少它，canDrop因为实例在调用时可能不可用。如果您希望此方法取决于组件的状态，请考虑将状态提升到父组件，以便可以使用props。通常，如果您愿意的话，代码会更干净props。请注意，这总是null在悬停无状态组件时发生。
收集功能
仅指定放置目标types并spec不够。
还有更多需要我们注意的事情：

将React DnD事件处理程序连接到组件中的某个节点；
将有关拖动状态的一些知识传递给我们的组件。
React组件之间的所有通信都是通过props进行的，因此React DnD将特殊的props注入到您的组件中是有意义的。但是，它使您可以自由命名它们并决定组件将接收的道具。

React DnD将使用一个连接器来调用您的收集功能，该连接器使您可以将节点连接到DnD后端，并使用一个监视器来查询有关拖动状态的信息。它应该返回道具的普通对象以注入到您的组件中。

如果您不熟悉这些概念，则概述应该为您提供一个很好的主意。

### 参数
connect：的实例DropTargetConnector。它只有一个dropTarget()方法。它返回一个函数，您需要将该函数传递给组件以将目标DOM节点连接到React DnD后端。如果{ connectDropTarget: connect.dropTarget() }从collect函数中返回类似的内容，则该组件将connectDropTarget作为道具接收，因此您可以将其内部的相关节点标记render()为可放置：return this.props.connectDropTarget(<div>...</div>)。您可以在此文件末尾的示例中看到此模式的实际作用。阅读DropTargetConnector文档以获取connect方法的完整列表，或阅读概述以获取连接器的简介。

monitor：的实例DropTargetMonitor。monitor与放置目标指定方法中收到的结果完全相同，您可以使用它来查询有关当前拖动状态的信息。阅读DropTargetMonitor文档以获取完整的monitor方法列表，或阅读概述以获取有关监视器的介绍。

props：组件的当前道具

### 返回值
DropTarget包装您的组件并返回另一个React组件。
为了简化测试，它提供了一个API来深入了解内部：

#### 静态特性
DecoratedComponent：返回包装的组件类型。

#### 实例方法
getDecoratedComponentInstance()：返回包装的组件实例。
getHandlerId()：返回拖动源ID，该ID可用于模拟测试后端的拖放事件。有关用法示例，请参考测试教程。

### 嵌套行为
如果放置目标嵌套在另一个放下目标，都hover()和drop()气泡从最里面的靶链向上。无法通过设计消除传播。取而代之的是，任何放置目标都可以进行比较monitor.isOver()并monitor.isOver({ shallow: true })验证是否悬停了孩子或当前放置目标。放置时，链中的任何放置目标都可以通过测试是否monitor.didDrop()返回来检查它是否是链中的第一个对象false。通过显式返回的另一个放置结果，任何父放置目标都可以覆盖子放置目标指定的放置结果drop()。如果父目标undefined从其drop()处理程序返回，它不会更改嵌套的放置目标可能已指定的现有放置结果。返回的下降目标false从canDrop()从drop()调度中排除。

### 处理文件和URL
使用HTML5后端时，您可以通过为内置类型HTML5Backend.NativeTypes.FILE或HTML5Backend.NativeTypes.URL内置类型注册放置目标来处理文件放置。由于浏览器的安全限制，monitor.getItem()在删除文件或URL之前，不提供任何有关文件或URL的信息。

### 例
查看教程以获取更多真实示例！

```js
import React from 'react'
import { findDOMNode } from 'react-dom'
import { DropTarget } from 'react-dnd'

// Drag sources and drop targets only interact
// if they have the same string type.
// You want to keep types in a separate file with
// the rest of your app's constants.
const Types = {
  CHESSPIECE: 'chesspiece'
}

/**
 * Specifies the drop target contract.
 * All methods are optional.
 */
const chessSquareTarget = {
  canDrop(props, monitor) {
    // You can disallow drop based on props or item
    const item = monitor.getItem()
    return canMakeChessMove(item.fromPosition, props.position)
  },

  hover(props, monitor, component) {
    // This is fired very often and lets you perform side effects
    // in response to the hover. You can't handle enter and leave
    // here—if you need them, put monitor.isOver() into collect() so you
    // can use componentDidUpdate() to handle enter/leave.

    // You can access the coordinates if you need them
    const clientOffset = monitor.getClientOffset()
    const componentRect = findDOMNode(component).getBoundingClientRect()

    // You can check whether we're over a nested drop target
    const isOnlyThisOne = monitor.isOver({ shallow: true })

    // You will receive hover() even for items for which canDrop() is false
    const canDrop = monitor.canDrop()
  },

  drop(props, monitor, component) {
    if (monitor.didDrop()) {
      // If you want, you can check whether some nested
      // target already handled drop
      return
    }

    // Obtain the dragged item
    const item = monitor.getItem()

    // You can do something with it
    ChessActions.movePiece(item.fromPosition, props.position)

    // You can also do nothing and return a drop result,
    // which will be available as monitor.getDropResult()
    // in the drag source's endDrag() method
    return { moved: true }
  }
}

/**
 * Specifies which props to inject into your component.
 */
function collect(connect, monitor) {
  return {
    // Call this function inside render()
    // to let React DnD handle the drag events:
    connectDropTarget: connect.dropTarget(),
    // You can ask the monitor about the current drag state:
    isOver: monitor.isOver(),
    isOverCurrent: monitor.isOver({ shallow: true }),
    canDrop: monitor.canDrop(),
    itemType: monitor.getItemType()
  }
}

class ChessSquare {
  componentDidUpdate(prevProps) {
    if (!prevProps.isOver && this.props.isOver) {
      // You can use this as enter handler
    }

    if (prevProps.isOver && !this.props.isOver) {
      // You can use this as leave handler
    }

    if (prevProps.isOverCurrent && !this.props.isOverCurrent) {
      // You can be more specific and track enter/leave
      // shallowly, not including nested targets
    }
  }

  render() {
    // Your component receives its own props as usual
    const { position } = this.props

    // These props are injected by React DnD,
    // as defined by your `collect` function above:
    const { isOver, canDrop, connectDropTarget } = this.props

    return connectDropTarget(
      <div className="Cell">
        {isOver && canDrop && <div class="green" />}
        {!isOver && canDrop && <div class="yellow" />}
        {isOver && !canDrop && <div class="red" />}
      </div>
    )
  }
}

export default DropTarget(
  Types.CHESSPIECE,
  chessSquareTarget,
  collect
)(ChessSquare)
```

### DragLayer
这是一项高级功能。

在大多数情况下，HTML5后端的默认呈现就足够了。但是，其拖动预览具有某些限制。例如，它必须是现有的节点屏幕截图或图像，并且不能更改进行中。

有时您可能要执行自定义渲染。如果您使用的是自定义后端，那么这也变得很有必要。DragLayer让您仅使用React组件自己执行拖动预览的呈现。它是一个接受以下一个必需参数的高阶组件。

要使用DragLayer，请不要忘记将应用程序的顶级组件包装在中DragDropContext。

### 签名
DragLayer使用部分应用程序。在第一次调用中指定其唯一参数后，您需要将React组件类作为第二次调用中的唯一参数传递。该签名DragLayer可用作装饰器。阅读概述以获得有关装饰器和高阶组件的更详细说明。

```js
import { DragLayer } from 'react-dnd'

class CustomDragLayer {
  /* ... */
}

export default DragLayer(collect)(CustomDragLayer)
```

### 参量
collect：必填。收集功能。它应该返回道具的普通对象以注入到您的组件中。它接收两个参数，monitor和props。阅读概述以获取有关监视器和收集功能的介绍。请参阅下一节中详细描述的收集功能。

options： 可选的。一个普通的对象。如果组件的某些道具不是标量的（即不是原始值或函数），则arePropsEqual(props, otherProps)在options对象内部指定自定义函数可以提高性能。除非您有性能问题，否则不要担心。

### 收集功能
收集函数签名是类似于收集功能DragSource和DropTarget，但它没有一个connect参数，因为拖动层不是交互式的，只反映拖动状态。每当全局拖动状态更改（包括坐标更改）时，都会调用收集功能，以便您的组件可以提供及时更新的自定义拖动预览。您可以询问monitor所拖动项目的客户坐标。

### 参量
monitor：的实例DragLayerMonitor。您可以使用它来查询有关当前拖动状态的信息，包括坐标。阅读DragLayerMonitor文档以获取完整的monitor方法列表，或阅读概述以获取有关监视器的介绍。

### 返回值
DragLayer包装您的组件并返回另一个React组件。
为了简化测试，它提供了一个API来深入了解内部：

#### 静态特性
DecoratedComponent：返回包装的组件类型。

#### 实例方法
getDecoratedComponentInstance()：返回包装的组件实例。

### 例

```js
import React from 'react'
import ItemTypes from './ItemTypes'
import BoxDragPreview from './BoxDragPreview'
import snapToGrid from './snapToGrid'
import { DragLayer } from 'react-dnd'

const layerStyles = {
  position: 'fixed',
  pointerEvents: 'none',
  zIndex: 100,
  left: 0,
  top: 0,
  width: '100%',
  height: '100%'
}

function getItemStyles(props) {
  const { currentOffset } = props
  if (!currentOffset) {
    return {
      display: 'none'
    }
  }

  const { x, y } = currentOffset
  const transform = `translate(${x}px, ${y}px)`
  return {
    transform: transform,
    WebkitTransform: transform
  }
}

function CustomDragLayer({ item, itemType, isDragging }) {
  if (!isDragging) {
    return null
  }

  function renderItem(type, item) {
    switch (type) {
      case ItemTypes.BOX:
        return <BoxDragPreview title={item.title} />
    }
  }

  return (
    <div style={layerStyles}>
      <div style={getItemStyles(props)}>{renderItem(itemType, item)}</div>
    </div>
  )
}

function collect(monitor) {
  return {
    item: monitor.getItem(),
    itemType: monitor.getItemType(),
    currentOffset: monitor.getSourceClientOffset(),
    isDragging: monitor.isDragging()
  }
}

export default DragLayer(collect)(CustomDragLayer)
```

### DragSourceConnector
DragSourceConnector是传递给对象收集功能的DragSource。它提供了将React组件绑定到Drag Source角色的功能。

### 物产
dragSource() => (Element | Node | Ref, options?)：返回必须预注入到您的组件中并在该组件的render()方法中使用的函数。您可以将此函数的react组件，DOM元素或ref对象传递给此方法。
dragPreview() => (Element | Node | Ref, options?)（可选）：返回一个函数，该函数可在组件内部使用以将拖动预览角色分配给节点。通过{ connectDragPreview: connect.dragPreview() }从收集函数返回，可以将任何React元素标记为拖动预览节点。要做到这一点，请更换element与this.props.connectDragPreview(element)内部render功能。拖动预览是开始拖动时将由HTML5后端截屏的节点。例如，如果您想通过一个小的自定义手柄来拖动某些东西，则可以将此手柄标记为dragSource()，也可以将一个较大的外部组件节点标记为dragPreview()。因此，较大的拖动预览出现在屏幕截图上，但是实际上只有较小的拖动源是可拖动的。另一种可能的自定义方法是将Image实例传递给dragPreview来自像这样的生命周期方法componentDidMount。这使您可以将实际图像用于拖动预览。（请注意，IE不支持此自定义）。有关不同的用法示例，请参见下面的示例代码。

### 方法选项
连接器方法返回的函数也接受选项。它们需要在组件内部传递，例如this.props.connectDragSource(<div>...</div>, { dropEffect: 'copy' })。HTML5后端支持以下所述的选项，但第三方或自定义后端可能不支持这些选项。

#### 的选项 dragSource
dropEffect： 可选的。一个字符串。默认情况下，'move'。在支持此功能的浏览器中，指定'copy'显示一个特殊的“正在复制”光标，而'move'对应于“移动”光标。您可能想使用此选项向用户提供有关操作是否具有破坏性的提示。

#### 的选项 dragPreview
captureDraggingState： 可选的。一个布尔值。默认情况下，false。如果为true，则组件将得知拖动开始而不是下一个刻度线时，该组件将立即被拖动。这意味着屏幕截图将在monitor.isDragging()已经存在的情况下发生true，并且如果将任何样式（如不透明度降低）应用于拖动的元素，则该样式也会反映在屏幕截图上。这很少是可取的，因此false明智的默认方法是。但是，true在极少数情况下，您可能希望将其设置为例如在IE中使自定义拖动层起作用并且您需要隐藏原始元素而不求助于IE不支持的空拖动预览。

anchorX： 可选的。0和之间的数字1。默认情况下，0.5。指定当尺寸不匹配时，相对于拖动源节点的偏移量如何转换为拖动预览的水平偏移量。0表示“将预览停靠在左侧”，0.5表示“线性插值”，并且1表示“将预览停靠在右侧”。

anchorY： 可选的。0和之间的数字1。默认情况下，0.5。指定当大小不匹配时，相对于拖动源节点的偏移如何转换为拖动预览的垂直偏移。0表示“将预览停靠在顶部，0.5意味着”线性插值”，并且1意味着“将预览停靠在底部”。

offsetX： 可选的。一个数字；如果不需要，则为null。默认情况下，为null。指定光标和拖动预览元素之间的垂直偏移。如果offsetX有值，则将不使用anchorX。

offsetY： 可选的。一个数字；如果不需要，则为null。默认情况下，为null。指定光标和拖动预览元素之间的垂直偏移。如果offsetY具有值，则将不使用anchorY。

### 用法

```js
import React from 'react';
import { DragSource } from 'react-dnd';

/* ... */

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview()
  };
}

class ComponentWithCopyEffect {
  render() {
    const { connectDragSource } = this.props;

    return connectDragSource(
      <div>
        This div shows a plus icon in some browsers.
      </div>,
      { dropEffect: 'copy' }
    );
  }
});
ComponentWithCopyEffect = DragSource(type, {/* ... */}, collect)(ComponentWithCopyEffect);

class ComponentWithHandle {
  render() {
    const { connectDragSource, connectDragPreview } = this.props;

    return connectDragPreview(
      <div>
        This div is draggable by a handle!
        {connectDragSource(
          <div>drag me</div>
        )}
      </div>
    );
  }
}
ComponentWithHandle = DragSource(type, {/* ... */}, collect)(ComponentWithHandle);

class ComponentWithImagePreview {
  componentDidMount() {
    const { connectDragPreview } = this.props;

    const img = new Image();
    img.src = 'http://mysite.com/image.jpg';
    img.onload = () => connectDragPreview(img);
  }

  render() {
    const { connectDragSource } = this.props;

    return connectDragSource(
      <div>
        This div shows an image when dragged!
      </div>
    );
  }
}
ComponentWithImagePreview = DragSource(type, {/* ... */}, collect)(ComponentWithImagePreview);
```

### DropTargetConnector
DropTargetConnector是传递给对象收集功能的DropTarget。它提供了将您的React组件绑定到Drop Target角色的功能。

### 物产
dropTarget() => (Element | Node | Ref)：返回必须预注入到您的组件中并在该组件的render()方法中使用的函数。您可以将此函数的react组件，DOM元素或ref对象传递给此方法。

### 用法

```js
import React from 'react'
import { DropTarget } from 'react-dnd'

class DropZone {
  render() {
    const { connectDropTarget } = this.props
    return connectDropTarget(<div>You can drop here!</div>)
  }
}

export default DropTarget(
  ItemTypes.Item,
  {
    /*...*/
  },
  (connect, monitor) => ({
    connectDropTarget: connect.dropTarget()
  })
)(DropZone)
```