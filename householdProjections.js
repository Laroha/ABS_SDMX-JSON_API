(function () {
    var myConnector = tableau.makeConnector();
 
   myConnector.getSchema = function (schemaCallback) {
    
	var cols = [
        { id : "stillingsnummer", alias : "Stillingnummer", dataType : tableau.dataTypeEnum.int },
        { id : "stillingsnummer_nav_no", alias : "Stillingsnummer_NAV", dataType : tableau.dataTypeEnum.int },
        { id : "stilling_id", alias : "Stillingsid", dataType : tableau.dataTypeEnum.int },
        { id : "nav_enhet_kode", alias : "NAV enhet", dataType : tableau.dataTypeEnum.int },
        { id : "registrert_dato", alias : "Registreringsdato", dataType : tableau.dataTypeEnum.date },
        { id : "sistepubl_dato", alias : "Siste publiseringsdato", dataType : tableau.dataTypeEnum.date },
        { id : "statistikk_aar_mnd", alias : "ARMANAD", dataType : tableau.dataTypeEnum.int },
        { id : "offisiell_statistikk_flagg", alias : "Offisiell statistikk", dataType : tableau.dataTypeEnum.int },

        { id : "stilling_kilde", alias : "Stillingskilde", dataType : tableau.dataTypeEnum.string },
        { id : "arbeidssted_fylkesnummer", alias : "Fylkesnr", dataType : tableau.dataTypeEnum.int },
        { id : "arbeidssted_fylke", alias : "Fylke", dataType : tableau.dataTypeEnum.string },
        { id : "arbeidssted_kommunenummer", alias : "Kommunenr", dataType : tableau.dataTypeEnum.int },
        { id : "arbeidssted_kommune", alias : "Kommune", dataType : tableau.dataTypeEnum.string },
        { id : "arbeidssted_landkode", alias : "Landkode", dataType : tableau.dataTypeEnum.string },
        { id : "arbeidssted_land", alias : "Land", dataType : tableau.dataTypeEnum.string },
        { id : "isco_versjon", alias : "ISCO versjon", dataType : tableau.dataTypeEnum.string },
        { id : "yrke_grovgruppe", alias : "Yrkesgruppe", dataType : tableau.dataTypeEnum.string },
        { id : "yrkeskode", alias : "Yrkeskode", dataType : tableau.dataTypeEnum.int },
        { id : "yrke", alias : "Yrke", dataType : tableau.dataTypeEnum.string },
        { id : "yrkesbetegnelse", alias : "Yrkesbetegnelse", dataType : tableau.dataTypeEnum.string },
        { id : "Bedrift Org Nr", alias : "Bedriftens organisasjonsnr", dataType : tableau.dataTypeEnum.int },
        { id : "Bedrift Navn", alias : "Bedrift", dataType : tableau.dataTypeEnum.string },
        { id : "Aktiv Flagg", alias : "Flagg", dataType : tableau.dataTypeEnum.string },
        { id : "Bedrift Naring Primar Kode", alias : "Næringskode", dataType : tableau.dataTypeEnum.int },
        { id : "Foretak Org Nr", alias : "Foretakets organisasjonsnr", dataType : tableau.dataTypeEnum.int },
        { id : "Foretak Navn", alias : "Foretak", dataType : tableau.dataTypeEnum.string },
        { id : "Foretak Sektor Gruppe", alias : "Sektor", dataType : tableau.dataTypeEnum.string },
        { id : "Tilleggskriterium", alias : "Tilleggskriterium", dataType : tableau.dataTypeEnum.string },
        { id : "antall_stillinger", alias : "Antall stillinger", dataType : tableau.dataTypeEnum.int },
        { id : "stillingstittel", alias : "Stillingstittel", dataType : tableau.dataTypeEnum.string },
   ];

    var tableInfo = {
        id : "Ledige_stillinger",
        alias : "Ledige stillinger",
        columns : cols
    };


schemaCallback([tableInfo]);

	
	
	
    
};
 
    myConnector.getData = function (table, doneCallback) {
    var tableData = [],
        Ledige_stillinger = "",
        HH_TYPE = "",
        PROJ_SERIES = "",
        Frequency = "",
        TIME_PERIOD = "",
        obs = 0;

    	$.getJSON("https://data.nav.no/api/3/action/datastore_search", function (resp) {
        var obsvs = resp.dataSets[0].observations; 


        for (var i = 0, len = Object.keys(obsvs).length; i < len; i++) {
			
			
			var arrKey = Object.keys(obsvs)[i].split(':')
			
            ASGS_2011_STATE_GCCSA_SA4_SA3_SA2 = resp.structure.dimensions.observation[0].values[arrKey[0]].name;
            HH_TYPE = resp.structure.dimensions.observation[1].values[arrKey[1]].name;
            PROJ_SERIES = resp.structure.dimensions.observation[2].values[arrKey[2]].name;
            Frequency = resp.structure.dimensions.observation[3].values[arrKey[3]].name;
            TIME_PERIOD = resp.structure.dimensions.observation[4].values[arrKey[4]].name;
            obs = obsvs[Object.keys(obsvs)[i]][0]; 

            tableData.push({
                "ASGS_2011_STATE_GCCSA_SA4_SA3_SA2" : ASGS_2011_STATE_GCCSA_SA4_SA3_SA2,
                "HH_TYPE" : HH_TYPE,
                "PROJ_SERIES" : PROJ_SERIES,
                "Frequency" : Frequency,
                "TIME_PERIOD" : TIME_PERIOD,
                "obs" : obs
            });
			
			
			
        }

        table.appendRows(tableData);

        doneCallback();
    });
};
    tableau.registerConnector(myConnector);
	
	$(document).ready(function () {
    $("#submitButton").click(function () {
        tableau.connectionName = "Australia: ABS Household Projections";
        tableau.submit();
    });
});
	
})();
