/* eslint-disable standard/computed-property-even-spacing */
/* eslint-disable eqeqeq */
/* eslint-disable camelcase */

var filterSku = {
  data () {
    return {
      pay_type: 0,
      o_pay_type: 2,
      keys: [],
      data: {},
      SKUResult: {},
      nowPrice: 0,
      nowOlPrice: 0,
      nowUdPrice: 0,
      sku_id: '',
      haveChangedId: []
    }
  },
  methods: {
    /* 商品详情数据 */
    queryDGoodsById () {
      this.initSKU() // 初始化，得到SKUResult
      /* 根据SKUResult得到初始化的时候哪些不能点击 */
      for (let i = 0; i < this.keys.length; i++) {
        for (let j = 0; j < this.keys[i].value.length; j++) {
          if (this.SKUResult[this.keys[i].value[j].id] == null) {
            this.keys[i].value[j].notClick = true
          }
        }
      }
    },
    // 获得对象的key
    getObjKeys (obj) {
      if (obj !== Object(obj)) throw new TypeError('Invalid object')
      var keys = []
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) { keys[keys.length] = key }
      }
      return keys
    },

    // 把组合的key放入结果集SKUResult
    add2SKUResult (combArrItem, sku) {
      console.log(sku)
      var key = combArrItem.join(',')
      if (this.SKUResult[key]) {
        // SKU信息key属性·
        this.SKUResult[key].stock += sku.stock
        this.SKUResult[key].ol_prices.push(sku.ol_price)
        this.SKUResult[key].ud_prices.push(sku.ud_price)
        this.SKUResult[key].prices.push(sku.price)
      } else {
        this.SKUResult[key] = {
          stock: sku.stock,
          prices: [sku.price],
          ol_prices: [sku.ol_price],
          ud_prices: [sku.ud_price],
          id: sku.id
        }
      }
    },

    // 初始化得到结果集
    initSKU () {
      var i
      var j
      var skuKeys = this.getObjKeys(this.data)
      for (i = 0; i < skuKeys.length; i++) {
        var skuKey = skuKeys[i] // 一条SKU信息key
        var sku = this.data[skuKey] // 一条SKU信息value
        var skuKeyAttrs = skuKey.split(',') // SKU信息key属性值数组
        skuKeyAttrs.sort(function (value1, value2) {
          return parseInt(value1) - parseInt(value2)
        })

        // 对每个SKU信息key属性值进行拆分组合
        var combArr = this.combInArray(skuKeyAttrs)
        for (j = 0; j < combArr.length; j++) {
          this.add2SKUResult(combArr[j], sku)
        }

        // 结果集接放入SKUResult
        this.SKUResult[skuKeyAttrs.join(',')] = {
          stock: sku.stock,
          prices: [sku.price],
          ol_prices: [sku.ol_price],
          ud_prices: [sku.ud_price],
          id: sku.id
        }
      }
    },

    /**
     * 从数组中生成指定长度的组合
     * 方法: 先生成[0,1...]形式的数组, 然后根据0,1从原数组取元素，得到组合数组
     */
    combInArray (aData) {
      if (!aData || !aData.length) {
        return []
      }

      var len = aData.length
      var aResult = []

      for (var n = 1; n < len; n++) {
        var aaFlags = this.getCombFlags(len, n)
        while (aaFlags.length) {
          var aFlag = aaFlags.shift()
          var aComb = []
          for (var i = 0; i < len; i++) {
            aFlag[i] && aComb.push(aData[i])
          }
          aResult.push(aComb)
        }
      }

      return aResult
    },

    /**
     * 得到从 m 元素中取 n 元素的所有组合
     * 结果为[0,1...]形式的数组, 1表示选中，0表示不选
     */
    getCombFlags (m, n) {
      if (!n || n < 1) {
        return []
      }

      var aResult = []
      var aFlag = []
      var bNext = true
      var i, j, iCnt1

      for (i = 0; i < m; i++) {
        aFlag[i] = i < n ? 1 : 0
      }

      aResult.push(aFlag.concat())

      while (bNext) {
        iCnt1 = 0
        for (i = 0; i < m - 1; i++) {
          if (aFlag[i] == 1 && aFlag[i + 1] == 0) {
            for (j = 0; j < i; j++) {
              aFlag[j] = j < iCnt1 ? 1 : 0
            }
            aFlag[i] = 0
            aFlag[i + 1] = 1
            var aTmp = aFlag.concat()
            aResult.push(aTmp)
            if (
              aTmp
                .slice(-n)
                .join('')
                .indexOf('0') == -1
            ) {
              bNext = false
            }
            break
          }
          aFlag[i] == 1 && iCnt1++
        }
      }
      return aResult
    },
    /* 商品条件筛选 */
    tabInfoChange (index, cindex) {
      this.putData(90074, 5, this.src_)
      // let orderInfo = this.keys /* 所有规格 */
      let orderInfoChild = this.keys[index]
        .value /* 当前点击的规格的所有子属性内容 */
      // 选中自己，兄弟节点取消选中
      if (orderInfoChild[cindex].notClick != true) {
        if (orderInfoChild[cindex].isActiveC == true) {
          orderInfoChild[cindex].isActiveC = false
        } else {
          for (let i = 0; i < orderInfoChild.length; i++) {
            orderInfoChild[i].isActiveC = false
          }
          orderInfoChild[cindex].isActiveC = true
        }
      }

      // 已经选择的节点
      let haveChangedId = []
      for (let i = 0; i < this.keys.length; i++) {
        for (let j = 0; j < this.keys[i].value.length; j++) {
          if (this.keys[i].value[j].isActiveC == true) {
            haveChangedId.push(this.keys[i].value[j].id)
          }
        }
      }
      if (haveChangedId.length) {
        // 获得组合key价格
        haveChangedId.sort(function (value1, value2) {
          return parseInt(value1) - parseInt(value2)
        })
        var len = haveChangedId.length
        var prices = this.SKUResult[haveChangedId.join(',')].prices
        var ol_prices = this.SKUResult[haveChangedId.join(',')].ol_prices
        var ud_prices = this.SKUResult[haveChangedId.join(',')].ud_prices

        var maxPrice = Math.max.apply(Math, prices)
        var minPrice = Math.min.apply(Math, prices)
        this.nowPrice =
          maxPrice > minPrice
            ? minPrice + '-' + maxPrice
            : maxPrice /* 筛选价格 */

        var maxOlPrice = Math.max.apply(Math, ol_prices)
        var minOlPrice = Math.min.apply(Math, ol_prices)
        this.nowOlPrice =
        maxOlPrice > minOlPrice
          ? minOlPrice + '-' + maxOlPrice
          : maxOlPrice /* 筛选价格 */

        var maxUdPrice = Math.max.apply(Math, ud_prices)
        var minUdPrice = Math.min.apply(Math, ud_prices)
        this.nowUdPrice =
          maxUdPrice > minUdPrice
            ? minUdPrice + '-' + maxUdPrice
            : maxUdPrice /* 筛选价格 */
        console.log('this.nowPrice', this.nowPrice, this.nowOlPrice, this.nowUdPrice)
        this.sku_id = this.SKUResult[haveChangedId.join(',')].id
        this.haveChangedId = haveChangedId
        //  赋值数量和价格
        if (this.haveChangedId.length == this.goodsData.spec_info.length) {
          this.form.goods[0].sku_id = this.sku_id
          //   this.form.sku_info = this.goodsData.sku_info[this.datac.join(',')]
          this.form.goods[0].gid = this.gid
        }

        // 用已选中的节点验证待测试节点
        let daiceshi = [] // 待测试节点
        let daiceshiId = []
        for (let i = 0; i < this.keys.length; i++) {
          for (let j = 0; j < this.keys[i].value.length; j++) {
            if (this.keys[index].value[cindex].id != this.keys[i].value[j].id) {
              daiceshi.push({
                index: i,
                cindex: j,
                id: this.keys[i].value[j].id
              })
              daiceshiId.push(this.keys[i].value[j].id)
            }
          }
        }
        for (let i = 0; i < haveChangedId.length; i++) {
          var indexs = daiceshiId.indexOf(haveChangedId[i])
          if (indexs > -1) {
            daiceshi.splice(indexs, 1)
          }
        }
        for (let i = 0; i < daiceshi.length; i++) {
          let testAttrIds = [] // 从选中节点中去掉选中的兄弟节点
          let siblingsId = ''
          for (let m = 0; m < this.keys[daiceshi[i].index].value.length; m++) {
            if (this.keys[daiceshi[i].index].value[m].isActiveC == true) {
              siblingsId = this.keys[daiceshi[i].index].value[m].id
            }
          }
          if (siblingsId != '') {
            for (let j = 0; j < len; j++) {
              haveChangedId[j] != siblingsId &&
                testAttrIds.push(haveChangedId[j])
            }
          } else {
            testAttrIds = haveChangedId.concat()
          }
          testAttrIds = testAttrIds.concat(
            this.keys[daiceshi[i].index].value[daiceshi[i].cindex].id
          )
          testAttrIds.sort(function (value1, value2) {
            return parseInt(value1) - parseInt(value2)
          })
          if (!this.SKUResult[testAttrIds.join(',')]) {
            this.keys[daiceshi[i].index].value[
              daiceshi[i].cindex
            ].notClick = true
            this.keys[daiceshi[i].index].value[
              daiceshi[i].cindex
            ].isActiveC = false
          } else {
            this.keys[daiceshi[i].index].value[
              daiceshi[i].cindex
            ].notClick = false
          }
        }
      } else {
        // 设置默认价格
        this.nowPrice = 0
        // 设置属性状态
        for (let i = 0; i < this.keys.length; i++) {
          for (let j = 0; j < this.keys[i].value.length; j++) {
            if (this.SKUResult[this.keys[i].value[j].id]) {
              this.keys[i].value[j].notClick = false
            } else {
              this.keys[i].value[j].notClick = true
              this.keys[i].value[j].isActiveC = false
            }
          }
        }
      }
      console.log(this.nowPrice, this.sku_id)
    }
  }
}
export default filterSku
