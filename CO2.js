var co2 = (() => {
    var ie = Object.create;
    var G = Object.defineProperty;
    var se = Object.getOwnPropertyDescriptor;
    var oe = Object.getOwnPropertyNames;
    var Ee = Object.getPrototypeOf,
        ce = Object.prototype.hasOwnProperty;
    var le = (t, e) => () => (e || t((e = {
            exports: {}
        }).exports, e), e.exports),
        ue = (t, e) => {
            for (var r in e) G(t, r, {
                get: e[r],
                enumerable: !0
            })
        },
        Z = (t, e, r, n) => {
            if (e && typeof e == "object" || typeof e == "function")
                for (let a of oe(e)) !ce.call(t, a) && a !== r && G(t, a, {
                    get: () => e[a],
                    enumerable: !(n = se(e, a)) || n.enumerable
                });
            return t
        };
    var Re = (t, e, r) => (r = t != null ? ie(Ee(t)) : {}, Z(e || !t || !t.__esModule ? G(r, "default", {
            value: t,
            enumerable: !0
        }) : r, t)),
        de = t => Z(G({}, "__esModule", {
            value: !0
        }), t);
    var re = le((st, te) => {
        "use strict";
        async function Pe(t, e) {
            return typeof t == "string" ? me(t, e) : Se(t, e)
        }

        function me(t, e) {
            return e.indexOf(t) > -1
        }

        function Ge(t) {
            return Object.entries(t).filter(([n, a]) => a.green).map(([n, a]) => a.url)
        }

        function Se(t, e) {
            let r = [];
            for (let n of t) e.indexOf(n) > -1 && r.push(n);
            return r
        }

        function Be(t, e) {
            return typeof t == "string" ? ee(t, e) : he(t, e)
        }

        function ee(t, e) {
            return e.indexOf(t) > -1 ? t : {
                url: t,
                green: !1
            }
        }

        function he(t, e) {
            let r = {};
            for (let n of t) r[n] = ee(n, e);
            return r
        }
        te.exports = {
            check: Pe,
            greenDomainsFromResults: Ge,
            find: Be
        }
    });
    var we = {};
    ue(we, {
        averageIntensity: () => f,
        co2: () => k,
        default: () => He,
        hosting: () => Y,
        marginalIntensity: () => j
    });
    var D = 4883333333333333e-25;
    var V = class {
        constructor(e) {
            this.allowRatings = !1, this.options = e, this.KWH_PER_BYTE_FOR_NETWORK = D
        }
        perByte(e, r) {
            if (e < 1) return 0;
            if (r) {
                let a = e * 72e-12 * 0,
                    i = e * D * 475;
                return a + i
            }
            let n = 72e-12 + D;
            return e * n * 519
        }
    };
    var L = V;
    var N = {
        GIGABYTE: 1e9
    };
    var Te = {
            AFG: 123.71,
            AFRICA: 541.36,
            ALB: 24.42,
            DZA: 633.65,
            ASM: 647.06,
            AGO: 167.22,
            ATG: 611.11,
            ARG: 353.96,
            ARM: 262.43,
            ABW: 550,
            ASEAN: 570.01,
            ASIA: 590.39,
            AUS: 556.3,
            AUT: 102.62,
            AZE: 669.99,
            BHS: 653.66,
            BHR: 902.41,
            BGD: 683.12,
            BRB: 600,
            BLR: 313.62,
            BEL: 117.58,
            BLZ: 155.56,
            BEN: 590,
            BTN: 24.19,
            BOL: 489.11,
            BIH: 637.2,
            BWA: 849.42,
            BRA: 96.4,
            BRN: 892.67,
            BGR: 264.21,
            BFA: 554.91,
            BDI: 230.77,
            CPV: 480,
            KHM: 470.59,
            CMR: 285.71,
            CAN: 165.15,
            CYM: 642.86,
            CAF: 0,
            TCD: 615.39,
            CHL: 301.93,
            CHN: 583.61,
            COL: 268.97,
            COM: 642.86,
            COG: 713.73,
            COD: 27.04,
            COK: 250,
            CRI: 24.77,
            CIV: 393.53,
            HRV: 174.48,
            CUB: 638.98,
            CYP: 512.24,
            CZE: 413.86,
            DNK: 143.3,
            DJI: 450,
            DMA: 600,
            DOM: 579.4,
            ECU: 176.28,
            EGY: 574.04,
            SLV: 118.46,
            GNQ: 605.1,
            ERI: 590.91,
            EST: 341.02,
            SWZ: 142.86,
            ETH: 23.55,
            EU: 213.31,
            EUROPE: 284.31,
            FLK: 1e3,
            FRO: 354.17,
            FJI: 278.26,
            FIN: 72.25,
            FRA: 44.18,
            GUF: 204.08,
            PYF: 436.62,
            G20: 481.51,
            G7: 353.61,
            GAB: 429.47,
            GMB: 666.67,
            GEO: 168.06,
            DEU: 344.14,
            GHA: 452.86,
            GRC: 319.76,
            GRL: 111.11,
            GRD: 666.67,
            GLP: 493.9,
            GUM: 611.11,
            GTM: 272.66,
            GIN: 182.72,
            GNB: 625,
            GUY: 634.33,
            HTI: 534.65,
            HND: 289.5,
            HKG: 681.99,
            HUN: 182.82,
            ISL: 28.33,
            IND: 713.01,
            IDN: 682.43,
            IRN: 641.73,
            IRQ: 689.4,
            IRL: 279.7,
            ISR: 567.26,
            ITA: 287.53,
            JAM: 561.25,
            JPN: 493.59,
            JOR: 539.21,
            KAZ: 821.9,
            KEN: 96.95,
            KIR: 500,
            XKX: 958.72,
            KWT: 636.91,
            KGZ: 150.77,
            LAO: 232.12,
            "LATIN AMERICA AND CARIBBEAN": 258.14,
            LVA: 136.22,
            LBN: 369.47,
            LSO: 20.83,
            LBR: 435.9,
            LBY: 830.53,
            LTU: 139.34,
            LUX: 134.62,
            MAC: 448.98,
            MDG: 477.27,
            MWI: 54.65,
            MYS: 607.88,
            MDV: 611.77,
            MLI: 394.5,
            MLT: 484.16,
            MTQ: 516.78,
            MRT: 481.71,
            MUS: 633.03,
            MEX: 492.34,
            "MIDDLE EAST": 641.21,
            MDA: 631.68,
            MNG: 785.08,
            MNE: 413.51,
            MSR: 1e3,
            MAR: 616.82,
            MOZ: 127.81,
            MMR: 588.95,
            NAM: 47.62,
            NRU: 750,
            NPL: 23.36,
            NLD: 253.31,
            NCL: 585.76,
            NZL: 104.42,
            NIC: 288.33,
            NER: 687.5,
            NGA: 508.82,
            "NORTH AMERICA": 363.32,
            PRK: 344.26,
            MKD: 568.97,
            NOR: 30.75,
            OCEANIA: 494.76,
            OECD: 349.67,
            OMN: 545.88,
            PAK: 425.69,
            PSE: 460.78,
            PAN: 258.74,
            PNG: 513.74,
            PRY: 24.86,
            PER: 300.53,
            POL: 614.98,
            PRT: 112.29,
            PRI: 660.8,
            QAT: 602.65,
            REU: 525.22,
            ROU: 245.55,
            RUS: 449.2,
            RWA: 301.89,
            KNA: 636.36,
            LCA: 650,
            SPM: 600,
            VCT: 600,
            WSM: 400,
            STP: 555.56,
            SAU: 696.31,
            SEN: 535.4,
            SRB: 673.16,
            SYC: 571.43,
            SLE: 47.62,
            SGP: 500.87,
            SVK: 96.49,
            SVN: 227.65,
            SLB: 636.36,
            SOM: 523.81,
            ZAF: 709.69,
            KOR: 432.11,
            SSD: 610.17,
            ESP: 146.15,
            LKA: 509.78,
            SDN: 214.33,
            SUR: 383.18,
            SWE: 35.82,
            CHE: 36.6,
            SYR: 682.27,
            TWN: 644.4,
            TJK: 87.5,
            TZA: 371.59,
            THA: 549.85,
            PHL: 612.54,
            TGO: 478.26,
            TON: 571.43,
            TTO: 682.11,
            TUN: 560.36,
            TUR: 469.7,
            TKM: 1306.3,
            TCA: 653.85,
            UGA: 57.39,
            UKR: 256.21,
            ARE: 492.7,
            GBR: 210.89,
            USA: 392.85,
            URY: 115.68,
            UZB: 1121.18,
            VUT: 500,
            VEN: 180.25,
            VNM: 472.47,
            VGB: 647.06,
            VIR: 641.79,
            WORLD: 484.4,
            YEM: 586.32,
            ZMB: 111,
            ZWE: 298.44
        },
        fe = "average";
    var f = {
        data: Te,
        type: fe
    };
    var $ = .81,
        b = .52,
        p = .14,
        M = .15,
        v = .19,
        T = f.data.WORLD,
        J = 50,
        _ = .75,
        C = .25,
        A = .02,
        S = {
            OPERATIONAL_KWH_PER_GB_DATACENTER: .055,
            OPERATIONAL_KWH_PER_GB_NETWORK: .059,
            OPERATIONAL_KWH_PER_GB_DEVICE: .08,
            EMBODIED_KWH_PER_GB_DATACENTER: .012,
            EMBODIED_KWH_PER_GB_NETWORK: .013,
            EMBODIED_KWH_PER_GB_DEVICE: .081,
            GLOBAL_GRID_INTENSITY: 494
        },
        X = {
            FIFTH_PERCENTILE: .095,
            TENTH_PERCENTILE: .186,
            TWENTIETH_PERCENTILE: .341,
            THIRTIETH_PERCENTILE: .493,
            FORTIETH_PERCENTILE: .656,
            FIFTIETH_PERCENTILE: .846
        },
        g = {
            FIFTH_PERCENTILE: .04,
            TENTH_PERCENTILE: .079,
            TWENTIETH_PERCENTILE: .145,
            THIRTIETH_PERCENTILE: .209,
            FORTIETH_PERCENTILE: .278,
            FIFTIETH_PERCENTILE: .359
        };
    var ge = S.GLOBAL_GRID_INTENSITY,
        P = t => parseFloat(t.toFixed(2)),
        O = (t, e) => t <= e;

    function H(t = {}, e = 3, r = !1) {
        let n = e === 4 ? ge : T;
        if (typeof t != "object") throw new Error("Options must be an object");
        let a = {};

        function i(s, o) {
            o || o === 0 ? typeof o == "object" ? (f.data[o.country?.toUpperCase()] || (console.warn(`"${o.country}" is not a valid country. Please use a valid 3 digit ISO 3166 country code. 
See https://developers.thegreenwebfoundation.org/co2js/data/ for more information. 
Falling back to global average grid intensity.`), a.gridIntensity[s] = {
                value: n
            }), a.gridIntensity[s] = {
                country: o.country,
                value: parseFloat(f.data[o.country?.toUpperCase()])
            }) : typeof o == "number" ? a.gridIntensity[s] = {
                value: o
            } : (a.gridIntensity[s] = {
                value: n
            }, console.warn(`The ${s} grid intensity must be a number or an object. You passed in a ${typeof o}. 
Falling back to global average grid intensity.`)) : a.gridIntensity[s] = {
                value: n
            }
        }
        if (t?.gridIntensity) {
            a.gridIntensity = {};
            let {
                device: s,
                dataCenter: o,
                network: l
            } = t.gridIntensity;
            i("device", s), i("dataCenter", o), i("network", l)
        } else a.gridIntensity = {
            device: {
                value: n
            },
            dataCenter: {
                value: n
            },
            network: {
                value: n
            }
        };
        return t?.greenHostingFactor || t.greenHostingFactor === 0 && e === 4 ? typeof t.greenHostingFactor == "number" ? t.greenHostingFactor >= 0 && t.greenHostingFactor <= 1 ? a.greenHostingFactor = t.greenHostingFactor : (a.greenHostingFactor = 0, console.warn(`The returnVisitPercentage option must be a number between 0 and 1. You passed in ${t.returnVisitPercentage}. 
Falling back to default value.`)) : (a.greenHostingFactor = 0, console.warn(`The returnVisitPercentage option must be a number. You passed in a ${typeof t.returnVisitPercentage}. 
Falling back to default value.`)) : e === 4 && (a.greenHostingFactor = 0), r && (a.greenHostingFactor = 1), a
    }

    function Q(t = {}, e = 3, r = !1) {
        if (typeof t != "object") throw new Error("Options must be an object");
        let n = H(t, e, r);
        return t?.dataReloadRatio || t.dataReloadRatio === 0 ? typeof t.dataReloadRatio == "number" ? t.dataReloadRatio >= 0 && t.dataReloadRatio <= 1 ? n.dataReloadRatio = t.dataReloadRatio : (n.dataReloadRatio = e === 3 ? A : 0, console.warn(`The dataReloadRatio option must be a number between 0 and 1. You passed in ${t.dataReloadRatio}. 
Falling back to default value.`)) : (n.dataReloadRatio = e === 3 ? A : 0, console.warn(`The dataReloadRatio option must be a number. You passed in a ${typeof t.dataReloadRatio}. 
Falling back to default value.`)) : (n.dataReloadRatio = e === 3 ? A : 0, console.warn(`The dataReloadRatio option must be a number. You passed in a ${typeof t.dataReloadRatio}. 
Falling back to default value.`)), t?.firstVisitPercentage || t.firstVisitPercentage === 0 ? typeof t.firstVisitPercentage == "number" ? t.firstVisitPercentage >= 0 && t.firstVisitPercentage <= 1 ? n.firstVisitPercentage = t.firstVisitPercentage : (n.firstVisitPercentage = e === 3 ? _ : 1, console.warn(`The firstVisitPercentage option must be a number between 0 and 1. You passed in ${t.firstVisitPercentage}. 
Falling back to default value.`)) : (n.firstVisitPercentage = e === 3 ? _ : 1, console.warn(`The firstVisitPercentage option must be a number. You passed in a ${typeof t.firstVisitPercentage}. 
Falling back to default value.`)) : (n.firstVisitPercentage = e === 3 ? _ : 1, console.warn(`The firstVisitPercentage option must be a number. You passed in a ${typeof t.firstVisitPercentage}. 
Falling back to default value.`)), t?.returnVisitPercentage || t.returnVisitPercentage === 0 ? typeof t.returnVisitPercentage == "number" ? t.returnVisitPercentage >= 0 && t.returnVisitPercentage <= 1 ? n.returnVisitPercentage = t.returnVisitPercentage : (n.returnVisitPercentage = e === 3 ? C : 0, console.warn(`The returnVisitPercentage option must be a number between 0 and 1. You passed in ${t.returnVisitPercentage}. 
Falling back to default value.`)) : (n.returnVisitPercentage = e === 3 ? C : 0, console.warn(`The returnVisitPercentage option must be a number. You passed in a ${typeof t.returnVisitPercentage}. 
Falling back to default value.`)) : (n.returnVisitPercentage = e === 3 ? C : 0, console.warn(`The returnVisitPercentage option must be a number. You passed in a ${typeof t.returnVisitPercentage}. 
Falling back to default value.`)), n
    }

    function w(t = "") {
        return {
            "User-Agent": `co2js/0.16.7 ${t}`
        }
    }

    function B(t, e) {
        let {
            FIFTH_PERCENTILE: r,
            TENTH_PERCENTILE: n,
            TWENTIETH_PERCENTILE: a,
            THIRTIETH_PERCENTILE: i,
            FORTIETH_PERCENTILE: s,
            FIFTIETH_PERCENTILE: o
        } = X;
        return e === 4 && (r = g.FIFTH_PERCENTILE, n = g.TENTH_PERCENTILE, a = g.TWENTIETH_PERCENTILE, i = g.THIRTIETH_PERCENTILE, s = g.FORTIETH_PERCENTILE, o = g.FIFTIETH_PERCENTILE), O(t, r) ? "A+" : O(t, n) ? "A" : O(t, a) ? "B" : O(t, i) ? "C" : O(t, s) ? "D" : O(t, o) ? "E" : "F"
    }
    var F = class {
        constructor(e) {
            this.allowRatings = !0, this.options = e, this.version = 3
        }
        energyPerByteByComponent(e) {
            let n = e / N.GIGABYTE * $;
            return {
                consumerDeviceEnergy: n * b,
                networkEnergy: n * p,
                productionEnergy: n * v,
                dataCenterEnergy: n * M
            }
        }
        co2byComponent(e, r = T, n = {}) {
            let a = T,
                i = T,
                s = T,
                o = T;
            if (n?.gridIntensity) {
                let {
                    device: c,
                    network: E,
                    dataCenter: u
                } = n.gridIntensity;
                (c?.value || c?.value === 0) && (a = c.value), (E?.value || E?.value === 0) && (i = E.value), (u?.value || u?.value === 0) && (s = u.value)
            }
            r === !0 && (s = J);
            let l = {};
            for (let [c, E] of Object.entries(e)) c.startsWith("dataCenterEnergy") ? l[c.replace("Energy", "CO2")] = E * s : c.startsWith("consumerDeviceEnergy") ? l[c.replace("Energy", "CO2")] = E * a : c.startsWith("networkEnergy") ? l[c.replace("Energy", "CO2")] = E * i : l[c.replace("Energy", "CO2")] = E * o;
            return l
        }
        perByte(e, r = !1, n = !1, a = !1, i = {}) {
            e < 1 && (e = 0);
            let s = this.energyPerByteByComponent(e, i);
            if (typeof r != "boolean") throw new Error(`perByte expects a boolean for the carbon intensity value. Received: ${r}`);
            let o = this.co2byComponent(s, r, i),
                c = Object.values(o).reduce((u, R) => u + R),
                E = null;
            return a && (E = this.ratingScale(c)), n ? a ? {
                ...o,
                total: c,
                rating: E
            } : {
                ...o,
                total: c
            } : a ? {
                total: c,
                rating: E
            } : c
        }
        perVisit(e, r = !1, n = !1, a = !1, i = {}) {
            let s = this.energyPerVisitByComponent(e, i);
            if (typeof r != "boolean") throw new Error(`perVisit expects a boolean for the carbon intensity value. Received: ${r}`);
            let o = this.co2byComponent(s, r, i),
                c = Object.values(o).reduce((u, R) => u + R),
                E = null;
            return a && (E = this.ratingScale(c)), n ? a ? {
                ...o,
                total: c,
                rating: E
            } : {
                ...o,
                total: c
            } : a ? {
                total: c,
                rating: E
            } : c
        }
        energyPerByte(e) {
            let r = this.energyPerByteByComponent(e);
            return Object.values(r).reduce((a, i) => a + i)
        }
        energyPerVisitByComponent(e, r = {}, n = _, a = C, i = A) {
            (r.dataReloadRatio || r.dataReloadRatio === 0) && (i = r.dataReloadRatio), (r.firstVisitPercentage || r.firstVisitPercentage === 0) && (n = r.firstVisitPercentage), (r.returnVisitPercentage || r.returnVisitPercentage === 0) && (a = r.returnVisitPercentage);
            let s = this.energyPerByteByComponent(e),
                o = {},
                l = Object.values(s);
            for (let [c, E] of Object.entries(s)) o[`${c} - first`] = E * n, o[`${c} - subsequent`] = E * a * i;
            return o
        }
        energyPerVisit(e) {
            let r = 0,
                n = 0,
                a = Object.entries(this.energyPerVisitByComponent(e));
            for (let [i, s] of a) i.indexOf("first") > 0 && (r += s);
            for (let [i, s] of a) i.indexOf("subsequent") > 0 && (n += s);
            return r + n
        }
        emissionsPerVisitInGrams(e, r = T) {
            return P(e * r)
        }
        annualEnergyInKwh(e, r = 1e3) {
            return e * r * 12
        }
        annualEmissionsInGrams(e, r = 1e3) {
            return e * r * 12
        }
        annualSegmentEnergy(e) {
            return {
                consumerDeviceEnergy: P(e * b),
                networkEnergy: P(e * p),
                dataCenterEnergy: P(e * M),
                productionEnergy: P(e * v)
            }
        }
        ratingScale(e) {
            return B(e, this.version)
        }
    };
    var h = F;
    var {
        OPERATIONAL_KWH_PER_GB_DATACENTER: Ie,
        OPERATIONAL_KWH_PER_GB_NETWORK: Ne,
        OPERATIONAL_KWH_PER_GB_DEVICE: _e,
        EMBODIED_KWH_PER_GB_DATACENTER: Ce,
        EMBODIED_KWH_PER_GB_NETWORK: Ae,
        EMBODIED_KWH_PER_GB_DEVICE: Oe,
        GLOBAL_GRID_INTENSITY: m
    } = S;

    function q(t, e) {
        let r = t.dataCenter + t.network + t.device,
            n = e.dataCenter + e.network + e.device,
            a = t.dataCenter + e.dataCenter,
            i = t.network + e.network,
            s = t.device + e.device;
        return {
            dataCenterOperationalCO2e: t.dataCenter,
            networkOperationalCO2e: t.network,
            consumerDeviceOperationalCO2e: t.device,
            dataCenterEmbodiedCO2e: e.dataCenter,
            networkEmbodiedCO2e: e.network,
            consumerDeviceEmbodiedCO2e: e.device,
            totalEmbodiedCO2e: n,
            totalOperationalCO2e: r,
            dataCenterCO2e: a,
            networkCO2e: i,
            consumerDeviceCO2e: s
        }
    }

    function z(t, e) {
        return t ? 1 : e?.greenHostingFactor || e?.greenHostingFactor === 0 ? e.greenHostingFactor : 0
    }
    var W = class {
        constructor(e) {
            this.allowRatings = !0, this.options = e, this.version = 4
        }
        operationalEnergyPerSegment(e) {
            let r = e / N.GIGABYTE,
                n = r * Ie,
                a = r * Ne,
                i = r * _e;
            return {
                dataCenter: n,
                network: a,
                device: i
            }
        }
        operationalEmissions(e, r = {}) {
            let {
                dataCenter: n,
                network: a,
                device: i
            } = this.operationalEnergyPerSegment(e), s = m, o = m, l = m;
            if (r?.gridIntensity) {
                let {
                    device: R,
                    network: I,
                    dataCenter: d
                } = r.gridIntensity;
                (R?.value || R?.value === 0) && (l = R.value), (I?.value || I?.value === 0) && (o = I.value), (d?.value || d?.value === 0) && (s = d.value)
            }
            let c = n * s,
                E = a * o,
                u = i * l;
            return {
                dataCenter: c,
                network: E,
                device: u
            }
        }
        embodiedEnergyPerSegment(e) {
            let r = e / N.GIGABYTE,
                n = r * Ce,
                a = r * Ae,
                i = r * Oe;
            return {
                dataCenter: n,
                network: a,
                device: i
            }
        }
        embodiedEmissions(e) {
            let {
                dataCenter: r,
                network: n,
                device: a
            } = this.embodiedEnergyPerSegment(e), i = m, s = m, o = m, l = r * i, c = n * s, E = a * o;
            return {
                dataCenter: l,
                network: c,
                device: E
            }
        }
        perByte(e, r = !1, n = !1, a = !1, i = {}) {
            if (e < 1) return 0;
            let s = this.operationalEmissions(e, i),
                o = this.embodiedEmissions(e),
                l = z(r, i),
                c = {
                    dataCenter: s.dataCenter * (1 - l) + o.dataCenter,
                    network: s.network + o.network,
                    device: s.device + o.device
                },
                E = c.dataCenter + c.network + c.device,
                u = null;
            if (a && (u = this.ratingScale(E)), n) {
                let R = {
                    ...q(s, o)
                };
                return a ? {
                    ...R,
                    total: E,
                    rating: u
                } : {
                    ...R,
                    total: E
                }
            }
            return a ? {
                total: E,
                rating: u
            } : E
        }
        perVisit(e, r = !1, n = !1, a = !1, i = {}) {
            let s = 1,
                o = 0,
                l = 0,
                c = z(r, i),
                E = this.operationalEmissions(e, i),
                u = this.embodiedEmissions(e);
            if (e < 1) return 0;
            (i.firstVisitPercentage || i.firstVisitPercentage === 0) && (s = i.firstVisitPercentage), (i.returnVisitPercentage || i.returnVisitPercentage === 0) && (o = i.returnVisitPercentage), (i.dataReloadRatio || i.dataReloadRatio === 0) && (l = i.dataReloadRatio);
            let R = E.dataCenter * (1 - c) + u.dataCenter + E.network + u.network + E.device + u.device,
                I = (E.dataCenter * (1 - c) + u.dataCenter + E.network + u.network + E.device + u.device) * (1 - l),
                d = R * s + I * o,
                y = null;
            if (a && (y = this.ratingScale(d)), n) {
                let x = {
                    ...q(E, u),
                    firstVisitCO2e: R,
                    returnVisitCO2e: I
                };
                return a ? {
                    ...x,
                    total: d,
                    rating: y
                } : {
                    ...x,
                    total: d
                }
            }
            return a ? {
                total: d,
                rating: y
            } : d
        }
        ratingScale(e) {
            return B(e, this.version)
        }
    };
    var K = W;
    var U = class {
        constructor(e) {
            if (this.model = new h, e?.model === "1byte") this.model = new L;
            else if (e?.model === "swd") this.model = new h, e?.version === 4 && (this.model = new K);
            else
            if (e?.model) throw new Error(`"${e.model}" is not a valid model. Please use "1byte" for the OneByte model, and "swd" for the Sustainable Web Design model.
See https://developers.thegreenwebfoundation.org/co2js/models/ to learn more about the models available in CO2.js.`);
            if (e?.rating && typeof e.rating != "boolean") throw new Error(`The rating option must be a boolean. Please use true or false.
See https://developers.thegreenwebfoundation.org/co2js/options/ to learn more about the options available in CO2.js.`);
            let r = !!this.model.allowRatings;
            if (this._segment = e?.results === "segment", this._rating = e?.rating === !0, !r && this._rating) throw new Error(`The rating system is not supported in the model you are using. Try using the Sustainable Web Design model instead.
See https://developers.thegreenwebfoundation.org/co2js/models/ to learn more about the models available in CO2.js.`)
        }
        perByte(e, r = !1) {
            return this.model.perByte(e, r, this._segment, this._rating)
        }
        perVisit(e, r = !1) {
            if (this.model?.perVisit) return this.model.perVisit(e, r, this._segment, this._rating);
            throw new Error(`The perVisit() method is not supported in the model you are using. Try using perByte() instead.
See https://developers.thegreenwebfoundation.org/co2js/methods/ to learn more about the methods available in CO2.js.`)
        }
        perByteTrace(e, r = !1, n = {}) {
            let a = H(n, this.model.version, r),
                {
                    gridIntensity: i,
                    ...s
                } = a,
                {
                    dataReloadRatio: o,
                    firstVisitPercentage: l,
                    returnVisitPercentage: c,
                    ...E
                } = s;
            return {
                co2: this.model.perByte(e, r, this._segment, this._rating, a),
                green: r,
                variables: {
                    description: "Below are the variables used to calculate this CO2 estimate.",
                    bytes: e,
                    gridIntensity: {
                        description: "The grid intensity (grams per kilowatt-hour) used to calculate this CO2 estimate.",
                        ...a.gridIntensity
                    },
                    ...E
                }
            }
        }
        perVisitTrace(e, r = !1, n = {}) {
            if (this.model?.perVisit) {
                let a = Q(n, this.model.version, r),
                    {
                        gridIntensity: i,
                        ...s
                    } = a;
                return {
                    co2: this.model.perVisit(e, r, this._segment, this._rating, a),
                    green: r,
                    variables: {
                        description: "Below are the variables used to calculate this CO2 estimate.",
                        bytes: e,
                        gridIntensity: {
                            description: "The grid intensity (grams per kilowatt-hour) used to calculate this CO2 estimate.",
                            ...a.gridIntensity
                        },
                        ...s
                    }
                }
            } else throw new Error(`The perVisitTrace() method is not supported in the model you are using. Try using perByte() instead.
See https://developers.thegreenwebfoundation.org/co2js/methods/ to learn more about the methods available in CO2.js.`)
        }
        SustainableWebDesignV3() {
            return new h
        }
        SustainableWebDesignV4() {
            return new K
        }
        OneByte() {
            return new L
        }
    };
    var k = U;
    var ne = Re(re());

    function ye(t, e) {
        let r = typeof e == "string" ? {
            userAgentIdentifier: e
        } : e;
        if (r?.db && r.verbose) throw new Error("verbose mode cannot be used with a local lookup database");
        return typeof t == "string" ? De(t, r) : Ve(t, r)
    }
    async function De(t, e = {}) {
        let r = await fetch(`https://api.thegreenwebfoundation.org/greencheck/${t}`, {
            headers: w(e.userAgentIdentifier)
        });
        if (e?.db) return ne.default.check(t, e.db);
        let n = await r.json();
        return e.verbose ? n : n.green
    }
    async function Ve(t, e = {}) {
        try {
            let r = "https://api.thegreenwebfoundation.org/v2/greencheckmulti",
                n = JSON.stringify(t),
                i = await (await fetch(`${r}/${n}`, {
                    headers: w(e.userAgentIdentifier)
                })).json();
            return e.verbose ? i : Le(i)
        } catch {
            return e.verbose ? {} : []
        }
    }

    function Le(t) {
        return Object.entries(t).filter(([n, a]) => a.green).map(([n, a]) => a.url)
    }
    var ae = {
        check: ye
    };

    function be(t, e) {
        return ae.check(t, e)
    }
    var Y = be;
    var pe = {
            AFG: "414",
            ALB: "0",
            DZA: "528",
            ASM: "753",
            AND: "188",
            AGO: "1476",
            AIA: "753",
            ATG: "753",
            ARG: "478",
            ARM: "390",
            ABW: "753",
            AUS: "808",
            AUT: "242",
            AZE: "534",
            "AZORES (PORTUGAL)": "753",
            BHS: "753",
            BHR: "726",
            BGD: "528",
            BRB: "749",
            BLR: "400",
            BEL: "252",
            BLZ: "403",
            BEN: "745",
            BMU: "753",
            BTN: "0",
            BOL: "604",
            BES: "753",
            BIH: "1197",
            BWA: "1486",
            BRA: "284",
            VGB: "753",
            BRN: "681",
            BGR: "911",
            BFA: "753",
            BDI: "414",
            KHM: "1046",
            CMR: "659",
            CAN: "372",
            CYM: "753",
            CPV: "753",
            CAF: "188",
            TCD: "753",
            "CHANNEL ISLANDS (U.K)": "753",
            CHL: "657",
            CHN: "899",
            COL: "410",
            COM: "753",
            COD: "0",
            COG: "659",
            COK: "753",
            CRI: "108",
            CIV: "466",
            HRV: "294",
            CUB: "559",
            CUW: "876",
            CYP: "751",
            CZE: "902",
            DNK: "362",
            DJI: "753",
            DMA: "753",
            DOM: "601",
            ECU: "560",
            EGY: "554",
            SLV: "547",
            GNQ: "632",
            ERI: "915",
            EST: "1057",
            SWZ: "0",
            ETH: "0",
            FLK: "753",
            FRO: "753",
            FJI: "640",
            FIN: "267",
            FRA: "158",
            GUF: "423",
            PYF: "753",
            GAB: "946",
            GMB: "753",
            GEO: "289",
            DEU: "650",
            GHA: "495",
            GIB: "779",
            GRC: "507",
            GRL: "264",
            GRD: "753",
            GLP: "753",
            GUM: "753",
            GTM: "798",
            GIN: "753",
            GNB: "753",
            GUY: "847",
            HTI: "1048",
            HND: "662",
            HUN: "296",
            ISL: "0",
            IND: "951",
            IDN: "783",
            IRN: "592",
            IRQ: "1080",
            IRL: "380",
            IMN: "436",
            ISR: "394",
            ITA: "414",
            JAM: "711",
            JPN: "471",
            JOR: "529",
            KAZ: "797",
            KEN: "574",
            KIR: "753",
            PRK: "754",
            KOR: "555",
            XKX: "1145",
            KWT: "675",
            KGZ: "217",
            LAO: "1069",
            LVA: "240",
            LBN: "794",
            LSO: "0",
            LBR: "677",
            LBY: "668",
            LIE: "151",
            LTU: "211",
            LUX: "220",
            MDG: "876",
            "MADEIRA (PORTUGAL)": "663",
            MWI: "489",
            MYS: "551",
            MDV: "753",
            MLI: "1076",
            MLT: "520",
            MHL: "753",
            MTQ: "753",
            MRT: "753",
            MUS: "700",
            MYT: "753",
            MEX: "531",
            FSM: "753",
            MDA: "541",
            MCO: "158",
            MNG: "1366",
            MNE: "899",
            MSR: "753",
            MAR: "729",
            MOZ: "234",
            MMR: "719",
            NAM: "355",
            NRU: "753",
            NPL: "0",
            NLD: "326",
            NCL: "779",
            NZL: "246",
            NIC: "675",
            NER: "772",
            NGA: "526",
            NIU: "753",
            MKD: "851",
            MNP: "753",
            NOR: "47",
            OMN: "479",
            PAK: "592",
            PLW: "753",
            PSE: "719",
            PAN: "477",
            PNG: "597",
            PRY: "0",
            PER: "473",
            PHL: "672",
            POL: "828",
            PRT: "389",
            PRI: "596",
            QAT: "503",
            REU: "772",
            ROU: "489",
            RUS: "476",
            RWA: "712",
            SHN: "753",
            KNA: "753",
            LCA: "753",
            MAF: "753",
            SPM: "753",
            VCT: "753",
            WSM: "753",
            SMR: "414",
            STP: "753",
            SAU: "592",
            SEN: "870",
            SRB: "1086",
            SYC: "753",
            SLE: "489",
            SGP: "379",
            SXM: "753",
            SVK: "332",
            SVN: "620",
            SLB: "753",
            SOM: "753",
            ZAF: "1070",
            SSD: "890",
            ESP: "402",
            LKA: "731",
            SDN: "736",
            SUR: "1029",
            SWE: "68",
            CHE: "48",
            SYR: "713",
            TWN: "484",
            TJK: "255",
            TZA: "531",
            THA: "450",
            TLS: "753",
            TGO: "859",
            TON: "753",
            TTO: "559",
            TUN: "468",
            TUR: "376",
            TKM: "927",
            TCA: "753",
            TUV: "753",
            UGA: "279",
            UKR: "768",
            ARE: "556",
            GBR: "380",
            USA: "416",
            URY: "174",
            UZB: "612",
            VUT: "753",
            VEN: "711",
            VNM: "560",
            VIR: "650",
            YEM: "807",
            ZMB: "416",
            ZWE: "1575",
            "MEMO:  EU 27": "409"
        },
        Me = "marginal",
        ve = "2021";
    var j = {
        data: pe,
        type: Me,
        year: ve
    };
    var He = {
        co2: k,
        hosting: Y,
        averageIntensity: f,
        marginalIntensity: j
    };
    return de(we);
})();
//# sourceMappingURL=index.js.map