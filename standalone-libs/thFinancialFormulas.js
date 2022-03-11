// thFinancialFormulas.js
//
// Copyright (c) 2013 MCW Team
// Gabriele Antonelli

function thFinancial() {

     this.series = null;
     this.result = new Object();
     this.rSeries0 = new Array();
     this.rSeries1 = new Array();
     this.rSeries2 = new Array();
     

    // UTILITIES
    this._setResult = function(outSeries, index, value) {
        outSeries.push([this.series.date[index], value]);
    }

    this._setNull = function(outSeries, index) {
        this._setResult(outSeries, index, null)
    }

    this._upwardDownwardSeries = function(srcSeries) {
         var _c = srcSeries.length;
        
        this.rSeries0.push(parseFloat(0));
        this.rSeries1.push(parseFloat(0));

        for (var i = 1; i < _c; i++) {
            if (srcSeries[i] > srcSeries[i-1]) {
                this.rSeries0.push(srcSeries[i] - srcSeries[i-1]);
                this.rSeries1.push(parseFloat(0));
            } else {
                this.rSeries0.push(parseFloat(0));
                this.rSeries1.push(srcSeries[i - 1] - srcSeries[i]);
            }
        }

        this.result.rSeries0 = this.rSeries0;
        this.result.rSeries1 = this.rSeries1;

        return this.result;
    }
    
    
    // STUDIES
    this.BollingerBands = function(srcSeries, periodParameter, deviationParameter) {

        this.series = srcSeries;
        cSeries = this.series.close;
        c = cSeries.length;

        if (c > periodParameter) {

            var tempTh1 = new thFinancial();
            simpleAvgSeries = tempTh1.SimpleMovingAverage(srcSeries,periodParameter);
            tempTh1 = null;
            var tempTh2 = new thFinancial();
            deviationSeries = tempTh2.StandardDeviation(srcSeries,periodParameter);
            tempTh2 = null;
        
            for (var i = 0; i < c; i++) {
                if (i >= (periodParameter - 1)) {
                    this._setResult(this.rSeries0, i, simpleAvgSeries.rSeries0[i][1] + deviationParameter * deviationSeries.rSeries0[i][1]);
                    this._setResult(this.rSeries1, i, simpleAvgSeries.rSeries0[i][1] - deviationParameter * deviationSeries.rSeries0[i][1]);
                } else {
                    this._setNull(this.rSeries0, i);
                    this._setNull(this.rSeries1, i);
                }
            }
        }

        this.result.rSeries0 = this.rSeries0;
        this.result.rSeries1 = this.rSeries1;

        return this.result;
    }
    
    this.Envelopes = function(srcSeries, periodParameter, shiftParameter) {

        this.series = srcSeries;
        cSeries = this.series.close;
        c = cSeries.length;

        if (c > periodParameter) {

            var tempTh1 = new thFinancial();
            simpleAvgSeries = tempTh1.SimpleMovingAverage(srcSeries,periodParameter);
            tempTh1 = null;

            for (var i = 0; i < c; i++) {
                if (i >= (periodParameter - 1)) {
                    this._setResult(this.rSeries0, i, simpleAvgSeries.rSeries0[i][1] * (1 + (shiftParameter / 100)));
                    this._setResult(this.rSeries1, i, simpleAvgSeries.rSeries0[i][1] * (1 - (shiftParameter / 100)));
                } else {
                    this._setNull(this.rSeries0, i);
                    this._setNull(this.rSeries1, i);
                }
            }
        }

        this.result.rSeries0 = this.rSeries0;
        this.result.rSeries1 = this.rSeries1;

        return this.result;
    }
    
    this.ExponentialMovingAverage = function(srcSeries, periodParameter) {

        this.series = srcSeries;
        cSeries = this.series.close;
        c = cSeries.length;
        
        if (c > periodParameter) {
        
            var percentage = 2.0 / (parseFloat(periodParameter) + 1.0);
            var yesterdayEMA = cSeries[0];
            var candidateValue;
            
            for (var i = 0; i < c; i++) {
                if (yesterdayEMA == null) { yesterdayEMA = parseFloat(0)}
                candidateValue = yesterdayEMA * (1 - percentage) + cSeries[i] * percentage;
                yesterdayEMA = candidateValue;
                    
                if (i >= (periodParameter - 1)) {
                    this._setResult(this.rSeries0, i, candidateValue);
                } else {
                    this._setNull(this.rSeries0, i);
                }
            }
        }
        this.result.rSeries0 = this.rSeries0;
        
        return this.result;
    }

    this.WeightedMovingAverage = function(srcSeries, periodParameter) {

        this.series = srcSeries;
        cSeries = this.series.close;
        c = cSeries.length;
        
        if (c > periodParameter) {
        
            var totalWeight = 0;
            for (var j = 1; j <= periodParameter; j++) { totalWeight += j; }
            
            for (var i = 0; i < c; i++) {
                if (i >= (periodParameter - 1)) {
                    var resultSum = 0;
                    for (var j = 1; j <= periodParameter; j++) {
                        resultSum += (j / totalWeight * cSeries[i - (periodParameter - j)]);
                    }
                    this._setResult(this.rSeries0, i, resultSum);
                } else {
                    this._setNull(this.rSeries0, i);
                }
            }
        }

        this.result.rSeries0 = this.rSeries0;
        
        return this.result;
    }

    this.SimpleMovingAverage = function(srcSeries, periodParameter) {
        
        this.series = srcSeries;
        cSeries = this.series.close;
        c = cSeries.length;
        
        if (c > periodParameter) {
        
            var totalSum = 0;
            for (var i = 0; i < c; i++) {
                var currVal = cSeries[i];
                if (currVal == null) { currVal = parseFloat(0); }
                totalSum += parseFloat(currVal);
                
                if (i >= (periodParameter - 1)) {
                    if (i >= periodParameter) {
                        toSubtractVal = cSeries[i - periodParameter];
                        if (toSubtractVal == null) { toSubtractVal = parseFloat(0); }
                        // subtract values previous than period
                        totalSum -= parseFloat(toSubtractVal);
                    }
                
                    this._setResult(this.rSeries0, i, totalSum / periodParameter);
                } else {
                    this._setNull(this.rSeries0, i);
                }
            }
        }

        this.result.rSeries0 = this.rSeries0;
        
        return this.result;
    }
    
    this.TriangularMovingAverage = function(srcSeries, periodParameter) {

        this.series = srcSeries;
        cSeries = this.series.close;
        c = cSeries.length;

        if (c > periodParameter) {
        
            var triangularPeriod = 0;
            var limitPeriod = periodParameter;
            var firstPassPeriodParameter = 0;
            var secondPassPeriodParameter = 0;

            if (periodParameter % 2 == 0) {
                limitPeriod = periodParameter + 1;
                firstPassPeriodParameter = periodParameter / 2;
                secondPassPeriodParameter = firstPassPeriodParameter + 1;
            } else {
                firstPassPeriodParameter = (periodParameter + 1) / 2;
                secondPassPeriodParameter = (periodParameter + 1) / 2;
            }

            var tempTh1 = new thFinancial();
            firstPassSeries = tempTh1.SimpleMovingAverage(srcSeries,firstPassPeriodParameter);
            tempTh1 = null;
 
            // have to build a tempSeries
            tempSeries = new Object();
            tempSeries.date = [];
            tempSeries.close = [];
            for (var j = 0; j < firstPassSeries.rSeries0.length; j++) {
                tempSeries.date.push(firstPassSeries.rSeries0[j][0]);
                tempSeries.close.push(firstPassSeries.rSeries0[j][1]);
            }
            var tempTh2 = new thFinancial();
            lastPassSeries = tempTh2.SimpleMovingAverage(tempSeries,secondPassPeriodParameter);
            tempTh2 = null;

            for (var i = 0; i < c; i++) {
                if (i >= (limitPeriod - 1)) {
                    this._setResult(this.rSeries0, i, lastPassSeries.rSeries0[i][1]);
                } else {
                    this._setNull(this.rSeries0, i);
                }
            }
        }
        
        this.result.rSeries0 = this.rSeries0;
        
        return this.result;
    }


    this.MedianPrice = function(srcSeries) {

        this.series = srcSeries;
        hSeries = this.series.high;
        lSeries = this.series.low;
        c = hSeries.length;

        if (c == 0 || lSeries.length == 0) {
            this.result.rSeries0 = new Array();
        } else {
            for (var i = 0; i < c; i++) {
                this._setResult(this.rSeries0, i, (hSeries[i] + lSeries[i]) / 2);
            }

            this.result.rSeries0 = this.rSeries0;
        }
        
        return this.result;
    }
    
    this.TypicalPrice = function(srcSeries) {

        this.series = srcSeries;
        hSeries = this.series.high;
        lSeries = this.series.low;
        cSeries = this.series.close;
        c = cSeries.length;

        if (c == 0 || hSeries.length == 0 || lSeries.length == 0) {
            this.result.rSeries0 = new Array();
        } else {
            for (var i = 0; i < c; i++) {
                this._setResult(this.rSeries0, i, (hSeries[i] + lSeries[i] + cSeries[i]) / 3);
            }

            this.result.rSeries0 = this.rSeries0;
        }
        
        return this.result;
    }

    
    // INDICATORS
    this.StandardDeviation = function(srcSeries, periodParameter) {

        this.series = srcSeries;
        cSeries = this.series.close;
        c = cSeries.length;
        
        if (c > periodParameter) {
            var tempTh1 = new thFinancial();
            simpleAverageSeries = tempTh1.SimpleMovingAverage(srcSeries,periodParameter);
            tempTh1 = null;

            for (var i = 0; i < c; i++) {
                if (i >= (periodParameter - 1)) {
                    var currentSum = 0;
                    for (var j = (i - periodParameter + 1); j <= i; j++) {
                        var currVal = cSeries[j];
                        if (currVal == null) { currVal = parseFloat(0); }
                        currentSum += Math.pow((currVal - simpleAverageSeries.rSeries0[i][1]), 2);
                    }
                    this._setResult(this.rSeries0, i, Math.sqrt(currentSum / periodParameter));
                } else {
                    this._setNull(this.rSeries0, i);
                }
            }
        }
        
        this.result.rSeries0 = this.rSeries0;

        return this.result;
    }

    this.MoneyFlow = function(srcSeries, periodParameter) {

        this.series = srcSeries;
        hSeries = this.series.high;
        lSeries = this.series.low;
        cSeries = this.series.close;
        vSeries = this.series.volume;
        c = cSeries.length;

        if (c == 0 || hSeries.length == 0 || lSeries.length == 0 || vSeries.length == 0) {
            this.result.rSeries0 = new Array();
        } else {
            if (c > periodParameter) {
            
                tpVal = new Array();
                mfVal = new Array();
                positiveMoneyFlow = new Array();
                negativeMoneyFlow = new Array();
                
                positiveMoneyFlow[0] = 0;
                negativeMoneyFlow[0] = 0;
                
                for (var i = 0; i < c; i++) {
                    tpVal[i] = (hSeries[i] + lSeries[i] + cSeries[i]) / 3;
                    mfVal[i] = vSeries[i] * tpVal[i];

                    if (i > 0) {
                        if (tpVal[i] > tpVal[i - 1]) {
                            positiveMoneyFlow[i] = mfVal[i];
                            negativeMoneyFlow[i] = 0;
                        } else {
                            positiveMoneyFlow[i] = 0;
                            negativeMoneyFlow[i] = mfVal[i];
                        }
                    } else {
                        // i = 0
                        positiveMoneyFlow[i] = mfVal[i];
                        negativeMoneyFlow[i] = 0;
                    }
                }
                
                var positiveMoneyFlowAmount;
                var negativeMoneyFlowAmount;

                for (var i = 0; i < c; i++) {
                    positiveMoneyFlowAmount = 0;
                    negativeMoneyFlowAmount = 0;

                    if (i >= (periodParameter - 1)) {
                        // calculate positive and negative amounts
                        for (var j = (i - periodParameter + 1); j <= i; j++)
                        {
                            positiveMoneyFlowAmount += positiveMoneyFlow[j];
                            negativeMoneyFlowAmount += negativeMoneyFlow[j];
                        }
                        this._setResult(this.rSeries0, i, 100 - 100 / (1 + positiveMoneyFlowAmount / negativeMoneyFlowAmount));
                    } else {
                        this._setNull(this.rSeries0, i);
                    }
                }
            }
            this.result.rSeries0 = this.rSeries0;
        }

        return this.result;
    }

    this.StochasticIndicator = function (srcSeries, kParameter, dParameter) {

        this.series = srcSeries;
        hSeries = this.series.high;
        lSeries = this.series.low;
        cSeries = this.series.close;
        vSeries = this.series.volume;
        c = cSeries.length;

        if (c == 0 || hSeries.length == 0 || lSeries.length == 0 || vSeries.length == 0) {
            this.result.rSeries0 = new Array();
            this.result.rSeries1 = new Array();
        } else {
            if (c > kParameter + dParameter) {

                // calculate %K
                var maxVal;
                var minVal;
                var intervalPeriod = kParameter - 1;

                for (var i = 0; i < c; i++) {
                    if (i >= (kParameter + dParameter - 2)) {
                        // find max and min value in period that preceed current day
                        maxVal = hSeries[i - intervalPeriod];
                        minVal = lSeries[i - intervalPeriod];

                        for (var j = (i - intervalPeriod + 1); j <= i; j++) {
                            if (hSeries[j] > maxVal) { maxVal = hSeries[j]; }
                            if (lSeries[j] < minVal) { minVal = lSeries[j]; }
                        }

                        this._setResult(this.rSeries0, i, ((cSeries[i] - minVal) / (maxVal - minVal)) * 100);
                        this._setNull(this.rSeries1, i);
                    } else {
                        this._setNull(this.rSeries0, i);
                        this._setNull(this.rSeries1, i);
                    }
                }
                
                // calculate %D
                var tempSeries = new Object();
                tempSeries.date = [];
                tempSeries.close = [];
                for (var j = 0; j < this.rSeries0.length; j++) {
                    tempSeries.date.push(this.rSeries0[j][0]);
                    tempSeries.close.push(this.rSeries0[j][1]);
                }
                var tempTh1 = new thFinancial();
                simpleAvgSeries = tempTh1.SimpleMovingAverage(tempSeries,dParameter);
                tempTh1 = null;

                this.rSeries1 = simpleAvgSeries.rSeries0;
                
                // reset wrong value
                for (var i = 0; i < (kParameter + dParameter); i++) {
                    this.rSeries0[i][1] = null;
                    this.rSeries1[i][1] = null;
                }
            }
            this.result.rSeries0 = this.rSeries0;
            this.result.rSeries1 = this.rSeries1;
        }

        return this.result;
    }

    this.MassIndex = function (srcSeries, periodParameter, mediumPeriodParameter) {

        this.series = srcSeries;
        hSeries = this.series.high;
        lSeries = this.series.low;
        c = hSeries.length;

        if (c == 0 || lSeries.length == 0) {
            this.result.rSeries0 = new Array();
        } else {
            if (c > periodParameter + mediumPeriodParameter) {
                diffSeries = new Array();
                
                // building diff series
                for (var i = 0; i < c; i++) { diffSeries.push(hSeries[i] - lSeries[i]); }
              
                var tempSeries = new Object();
                tempSeries.date = [];
                tempSeries.close = [];
                for (var j = 0; j < c; j++) {
                    tempSeries.date.push(this.series.date[j]);
                    tempSeries.close.push(diffSeries[j]);
                }

                var tempTh1 = new thFinancial();
                expAverageSeries = tempTh1.ExponentialMovingAverage(tempSeries,mediumPeriodParameter);
                tempTh1 = null;
                
                var tempSeries2 = new Object();
                tempSeries2.date = [];
                tempSeries2.close = [];
                for (var j = 0; j < c; j++) {
                    tempSeries2.date.push(expAverageSeries.rSeries0[j][0]);
                    tempSeries2.close.push(expAverageSeries.rSeries0[j][1]);
                }

                var tempTh2 = new thFinancial();
                doubleExpAverageSeries = tempTh2.ExponentialMovingAverage(tempSeries2,mediumPeriodParameter);
                tempTh2 = null;

                var massIndexAmount;

                for (var i = 0; i < c; i++) {
                    massIndexAmount = 0;

                    if (i >= (periodParameter + mediumPeriodParameter - 1)) {
                        // sum of the period
                        for (var j = (i - periodParameter + 1); j <= i; j++) {
                            var addend = expAverageSeries.rSeries0[j][1] / doubleExpAverageSeries.rSeries0[j][1];
                            if (addend == null) { addend = 0.0; }
                            massIndexAmount += addend;
                        }

                        this._setResult(this.rSeries0, i, massIndexAmount);
                    } else {
                        this._setNull(this.rSeries0, i);
                    }
                }
            }
            
            this.result.rSeries0 = this.rSeries0;
        }

        return this.result;
    }

    this.NegativeVolumeIndex = function (srcSeries, startValue) {

        this.series = srcSeries;
        cSeries = this.series.close;
        vSeries = this.series.volume;
        c = cSeries.length;

        if (c == 0 || vSeries.length == 0) {
            this.result.rSeries0 = new Array();
        } else {
            this._setResult(this.rSeries0, 0, startValue);
            
            for (var i = 1; i < c; i++) {
                if (vSeries[i] > vSeries[i - 1]) {
                    this._setResult(this.rSeries0, i, this.rSeries0[i - 1][1]);
                } else {
                    this._setResult(this.rSeries0, i, ((cSeries[i] - cSeries[i - 1]) / cSeries[i - 1]) * this.rSeries0[i - 1][1] + this.rSeries0[i - 1][1]);
                }
            }

            this.result.rSeries0 = this.rSeries0;
        }

        return this.result;
    }

    this.PositiveVolumeIndex = function (srcSeries, startValue) {

        this.series = srcSeries;
        cSeries = this.series.close;
        vSeries = this.series.volume;
        c = cSeries.length;

        if (c == 0 || vSeries.length == 0) {
            this.result.rSeries0 = new Array();
        } else {
            this._setResult(this.rSeries0, 0, startValue);
            
            for (var i = 1; i < c; i++) {
                if (vSeries[i] < vSeries[i - 1]) {
                    this._setResult(this.rSeries0, i, this.rSeries0[i - 1][1]);
                } else {
                    this._setResult(this.rSeries0, i, ((cSeries[i] - cSeries[i - 1]) / cSeries[i - 1]) * this.rSeries0[i - 1][1] + this.rSeries0[i - 1][1]);
                }
            }

            this.result.rSeries0 = this.rSeries0;
        }

        return this.result;
    }

    this.EaseOfMovement = function (srcSeries) {

        this.series = srcSeries;
        hSeries = this.series.high;
        lSeries = this.series.low;
        vSeries = this.series.volume;
        c = hSeries.length;

        if (c == 0 || lSeries.length == 0 || vSeries.length == 0) {
            this.result.rSeries0 = new Array();
        } else {
            this._setResult(this.rSeries0, 0, ((hSeries[0] - lSeries[0]) / 2) / (vSeries[0] / (hSeries[0] - lSeries[0])));
            
            for (var i = 1; i < c; i++) {
                var diffToday = hSeries[i] - lSeries[i];
                var diffYesterday = hSeries[i - 1] - lSeries[i - 1];
                this._setResult(this.rSeries0, i, (diffToday / 2 - diffYesterday / 2) / (vSeries[i] / diffToday));
            }

            this.result.rSeries0 = this.rSeries0;
        }

        return this.result;
    }

    this.MACD = function(srcSeries, fastParameter, slowParameter) {

        this.series = srcSeries;
        hSeries = this.series.high;
        c = hSeries.length;

        if (c > slowParameter) {

            // MACD
            var tempTh1 = new thFinancial();
            fastSeries = tempTh1.ExponentialMovingAverage(srcSeries, fastParameter);
            tempTh1 = null;

            var tempTh2 = new thFinancial();
            slowSeries = tempTh2.ExponentialMovingAverage(srcSeries, slowParameter);
            tempTh2 = null;

            for (var i = 0; i < c; i++) {
                if (i >= slowParameter) {
                    this._setResult(this.rSeries0, i, fastSeries.rSeries0[i][1] - slowSeries.rSeries0[i][1]);
                } else {
                    this._setNull(this.rSeries0, i);
                }
            }

            // for calculating Signal line values
            var tempSeries = new Object();
            tempSeries.date = [];
            tempSeries.close = [];
            for (var j = 0; j < c; j++) {
                tempSeries.date.push(this.rSeries0[j][0]);
                tempSeries.close.push(this.rSeries0[j][1]);
            }

            var tempTh3 = new thFinancial();
            signalLine = tempTh3.ExponentialMovingAverage(tempSeries, 9);

            // Signal line
            for (var i = 0; i < c; i++) {
                if (i >= slowParameter) {
                    this._setResult(this.rSeries1, i, signalLine.rSeries0[i][1]);
                } else {
                    this._setNull(this.rSeries1, i);
                }
            }

            // MACD istogram
            for (var i = 0; i < c; i++) {
                if (i >= slowParameter) {
                    this._setResult(this.rSeries2, i, this.rSeries0[i][1] - this.rSeries1[i][1]);
                } else {
                    this._setNull(this.rSeries2, i);
                }
            }
        }

        this.result.rSeries0 = this.rSeries0;
        this.result.rSeries1 = this.rSeries1;
        this.result.rSeries2 = this.rSeries2;

        return this.result;
    }

    this.OnBalanceVolume = function (srcSeries) {

        this.series = srcSeries;
        cSeries = this.series.close;
        vSeries = this.series.volume;
        c = cSeries.length;

        if (c == 0 || vSeries.length == 0) {
            this.result.rSeries0 = new Array();
        } else {
            this._setResult(this.rSeries0, 0, vSeries[0]);
            
            for (var i = 1; i < c; i++) {
                if (cSeries[i] > cSeries[i - 1]) {
                    this._setResult(this.rSeries0, i, this.rSeries0[i - 1][1] + vSeries[i]);
                } else if (cSeries[i] < cSeries[i - 1]) {
                    this._setResult(this.rSeries0, i, this.rSeries0[i - 1][1] - vSeries[i]);
                } else {
                    this._setResult(this.rSeries0, i, this.rSeries0[i - 1][1]);
                }
            }

            this.result.rSeries0 = this.rSeries0;
        }

        return this.result;
    }

    this.Performance = function (srcSeries) {

        this.series = srcSeries;
        cSeries = this.series.close;
        c = cSeries.length;

        var firstClose = cSeries[0];
        
        for (var i = 0; i < c; i++) {
            this._setResult(this.rSeries0, i, ((cSeries[i] - firstClose) / firstClose) * 100);
        }

        this.result.rSeries0 = this.rSeries0;

        return this.result;
    }

    this.RSI = function (srcSeries, periodParameter) {

        this.series = srcSeries;
        cSeries = this.series.close;
        c = cSeries.length;

        if (c > periodParameter) {
            var tempTh1 = new thFinancial();
            wardSeries = tempTh1._upwardDownwardSeries(cSeries);
            tempTh1 = null;
            
            var tempSeries = new Object();
            tempSeries.date = [];
            tempSeries.close = [];
            for (var j = 0; j < c; j++) {
                tempSeries.date.push(this.series.date[j]);
                tempSeries.close.push(wardSeries.rSeries0[j]);
            }
            var tempTh2 = new thFinancial();
            averageUpward = tempTh2.ExponentialMovingAverage(tempSeries,periodParameter);
            tempTh2 = null;

            tempSeries.date = [];
            tempSeries.close = [];
            for (var j = 0; j < c; j++) {
                tempSeries.date.push(this.series.date[j]);
                tempSeries.close.push(wardSeries.rSeries1[j]);
            }
            var tempTh3 = new thFinancial();
            averageDownward = tempTh3.ExponentialMovingAverage(tempSeries,periodParameter);
            tempTh3 = null;

            var k = averageUpward.rSeries0.length;
            var rs = new Array();
            for (var j = 0; j < k; j++) {
                if (averageDownward.rSeries0[j] == 0) {
                    rs.push(parseFloat(100));
                } else {
                    rs.push(averageUpward.rSeries0[j][1] / averageDownward.rSeries0[j][1]);
                }
            }

            for (var j = 0; j < k; j++) {
                if (j >= (periodParameter - 1)) {
                    this._setResult(this.rSeries0, j, 100 - (100 / (1 + rs[j])));
                } else {
                    this._setNull(this.rSeries0, j);
                }
            }
        }

        this.result.rSeries0 = this.rSeries0;

        return this.result;
    }

    this.PriceVolumeTrend = function (srcSeries) {

        this.series = srcSeries;
        cSeries = this.series.close;
        vSeries = this.series.volume;
        c = cSeries.length;

        if (c == 0 || vSeries.length == 0) {
            this.result.rSeries0 = new Array();
        } else {
            this._setResult(this.rSeries0, 0, parseFloat(0));
            
            for (var i = 1; i < c; i++) {
                this._setResult(this.rSeries0, i, this.rSeries0[i - 1][1] + vSeries[i] * ((cSeries[i] - cSeries[i - 1]) / cSeries[i - 1]));
            }

            this.result.rSeries0 = this.rSeries0;
        }

        return this.result;
    }

    this.VolumeOscillator = function (srcSeries, fastParameter, slowParameter) {

        this.series = srcSeries;
        vSeries = this.series.volume;
        c = vSeries.length;
        
        if (c == 0) {
            this.result.rSeries0 = new Array();
        } else {
            if (c > slowParameter) {
                var tempSeries = new Object();
                tempSeries.date = [];
                tempSeries.close = [];
                for (var j = 0; j < c; j++) {
                    tempSeries.date.push(this.series.date[j]);
                    tempSeries.close.push(vSeries[j]);
                }

                var tempTh1 = new thFinancial();
                fastSeries = tempTh1.ExponentialMovingAverage(tempSeries,fastParameter);
                tempTh1 = null;

                var tempTh2 = new thFinancial();
                slowSeries = tempTh2.ExponentialMovingAverage(tempSeries,slowParameter);
                tempTh2 = null;

                for (var i = 0; i < c; i++) {
                    if (i >= slowParameter) {
                        this._setResult(this.rSeries0, i, ((fastSeries.rSeries0[i][1] - slowSeries.rSeries0[i][1]) / fastSeries.rSeries0[i][1]) * 100);
                    } else {
                        this._setNull(this.rSeries0, i);
                    }
                }
            }
            
            this.result.rSeries0 = this.rSeries0;
        }

        return this.result;
    }
    
    this.WilliamsR = function (srcSeries, periodParameter) {

        this.series = srcSeries;
        hSeries = this.series.high;
        lSeries = this.series.low;
        cSeries = this.series.close;
        c = cSeries.length;

        if (c == 0 || hSeries.length == 0 || lSeries.length == 0) {
            this.result.rSeries0 = new Array();
        } else {
            if (c > periodParameter) {
                var maxVal;
                var minVal;
                var intervalPeriod = periodParameter - 1;

                for (var i = 0; i < c; i++) {
                    if (i >= (periodParameter - 1)) {
                        // find max and min in the period
                        maxVal = hSeries[i - intervalPeriod];
                        minVal = lSeries[i - intervalPeriod];

                        for (var j = (i - intervalPeriod + 1); j <= i; j++) {
                            if (hSeries[j] > maxVal) { maxVal = hSeries[j]; }
                            if (lSeries[j] < minVal) { minVal = lSeries[j]; }
                        }

                        this._setResult(this.rSeries0, i, ((maxVal - cSeries[i]) / (maxVal - minVal)) * -100);
                    } else {
                        this._setNull(this.rSeries0, i);
                    }
                }
            }
            
            this.result.rSeries0 = this.rSeries0;
        }

        return this.result;
    }

    this.methods = {
        "BollingerBands":this.BollingerBands,
        "Envelopes":this.Envelopes ,
        "MediaMobileEsponenziale":this.ExponentialMovingAverage,
        "MediaMobilePonderata":this.WeightedMovingAverage,
        "MediaMobileSemplice1":this.SimpleMovingAverage,
        "MediaMobileSemplice2": this.SimpleMovingAverage,
        "MediaMobileTriangolare": this.TriangularMovingAverage,
        "MedianPrice":this.MedianPrice,
        "TypicalPrice":this.TypicalPrice,
        
        "StandardDeviation":this.StandardDeviation,
        "MoneyFlow":this.MoneyFlow,
        "StochasticIndicator":this.StochasticIndicator,
        "MassIndex":this.MassIndex,
        "NegativeVolumeIndex":this.NegativeVolumeIndex,
        "PositiveVolumeIndex":this.PositiveVolumeIndex,
        "EaseOfMovement":this.EaseOfMovement,
        "MACD":this.MACD,
        "OnBalanceVolume":this.OnBalanceVolume,
        "Performance":this.Performance,
        "RSI":this.RSI,
        "PriceVolumeTrend":this.PriceVolumeTrend,
        "VolumeOscillator":this.VolumeOscillator,
        "WilliamsR":this.WilliamsR    
    };
};