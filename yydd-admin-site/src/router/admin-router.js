/*后台管理*/
const goodsList = r => require.ensure([], () => r(require('../page/admin/goods/list')), 'goodsList')
const goodsCreate = r => require.ensure([], () => r(require('../page/admin/goods/create')), 'goodsCreate')
const goodsEdit = r => require.ensure([], () => r(require('../page/admin/goods/edit')), 'goodsEdit')
/*详情*/
const detailList = r => require.ensure([], () => r(require('../page/admin/detail/list')), 'detailList')

/*定制*/
const customizeList = r => require.ensure([], () => r(require('../page/admin/customize/list')), 'customizeList')

/*评价*/
const commentList = r => require.ensure([], () => r(require('../page/admin/comment/list')), 'commentList')

/*新闻中心*/
const newsList = r => require.ensure([], () => r(require('../page/admin/news/list')), 'newsList')
const newsCreate = r => require.ensure([], () => r(require('../page/admin/news/create')), 'newsCreate')
const router = [
 		{
 			name : "admin.goods.list",
			path : "/",
			component : goodsList
		},
		{
 			name : "admin.goods.create",
			path : "/goods/create",
			component : goodsCreate
		},
		{
 			name : "admin.goods.edit",
			path : "/goods/edit/productId/:productId",
			component : goodsEdit
		},
		{
 			name : "admin.detail.list",
			path : "/detail/list/productId/:productId",
			component : detailList
		},
		{
 			name : "admin.customize.list",
			path : "/customize/list",
			component : customizeList
		},
		{
 			name : "admin.comment.list",
			path : "/comment/list",
			component : commentList
		},
		{
 			name : "admin.news.list",
			path : "/news/list",
			component : newsList
		},
		{
 			name : "admin.news.create",
			path : "/news/create",
			component : newsCreate
		},
		{
 			name : "admin.news.editor",
			path : "/news/editor/id/:id",
			component : newsCreate
		}
 ]
export default{
	router
}