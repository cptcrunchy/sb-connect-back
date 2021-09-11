/*
 *
 * HomePage
 *
 */
import { HeaderNav, LoadingIndicator, PluginHeader, } from "strapi-helper-plugin";
import Row from "../../components/Row";
import Block from "../../components/Block";
import { Select, Label } from "@buffetjs/core";
import { get, has, isEmpty, pickBy, set } from "lodash";

import React, { memo, Component } from 'react';
import { request } from 'strapi-helper-plugin'
// import PropTypes from 'prop-types';
import pluginId from '../../pluginId';
import UploadFileForm from '../../components/UploadFileForm';

const getUrl = (to) => to ? `/plugins/${pluginId}/${to}` : `/plugins/${pluginId}`;

class HomePage extends Component {
  importSources = [
    { label: "External URL ", value: "url" },
    { label: "Upload file", value: "upload" },
    { label: "Raw text", value: "raw" },
  ];

  state = {
    loading: true,
    modelOptions: [],
    models: [],
    importSource: "upload",
    analyzing: false,
    analysis: null,
    selectedContentType: ""
  };

  componentDidMount() {
    this.getModels().then(res => {
      const { models, modelOptions } = res;
      this.setState({
        models,
        modelOptions,
        selectedContentType: modelOptions ? modelOptions[0].value : ""
      })
    })
  }

  selectImportDest = selectedContentType => {
    this.setState({ selectedContentType })
  }

  selectImportSource = (importSource) => {
    this.setState({ importSource });
  };

  onRequestAnalysis = async (analysisConfig) => {
    this.analysisConfig = analysisConfig;
    this.setState({ analyzing: true }, async () => {
      try {
        const response = await request("/import-content/preAnalyzeImportFile", {
          method: "POST",
          body: analysisConfig,
        });

        this.setState({ analysis: response, analyzing: false }, () => {
          strapi.notification.toggle({
            id: "app.notification.success",
            defaultMessage: `Analyzed Successfully`,
          });
        });
      } catch (e) {
        this.setState({ analyzing: false }, () => {
          strapi.notification.toggle(
            {
              id: "app.notification.warning",
              defaultMessage: `Analyze Failed: ${e}`,
            }
          );
        });
      }
    });
  };

  getModels = async () => {
    this.setState({ loading: true });
    try {
      const response = await request("/content-type-builder/content-types", {
        method: "GET",
      });

      // Remove non-user content types from models
      const models = get(response, ["data"], []).filter(
        (obj) => !has(obj, "plugin")
      );
      const modelOptions = models.map((model) => {
        return {
          label: get(model, ["schema", "name"], ""), // (name is used for display_name)
          value: model.uid, // (uid is used for table creations)
        };
      });

      this.setState({ loading: false });

      return { models, modelOptions };
    } catch (e) {
      this.setState({ loading: false }, () => {
        strapi.notification.toggle({
          id: "app.notification.warning",
          defaultMessage: `${e}`,
        });
      });
    }
    return [];
  };

  render() {
    return (
      <div className={"container-fluid"} style={{ padding: "18px 30px" }}>
        <PluginHeader
          title={"Import Content"}
          description={"Import CSV and RSS-Feed into your Content Types"}
        />
        <HeaderNav
          links={[
            {
              name: "Import Data",
              to: getUrl(""),
            },
            {
              name: "Import History",
              to: getUrl("history"),
            },
          ]}
          style={{ marginTop: "4.4rem" }}
        />
        <div className="row">
          <Block
            title="General"
            description="Configure the Import Source & Destination"
            style={{ marginBottom: 12 }}
          >
            <Row className={"row"}>
              <div className={"col-4"}>
                <Label htmlFor="importSource">Import Source</Label>
                <Select
                  name="importSource"
                  options={this.importSources}
                  value={this.state.importSource}
                  onChange={({ target: { value } }) =>
                    this.selectImportSource(value)
                  }
                />
              </div>
              <div className={"col-4"}>
                <Label htmlFor="importDest">Import Destination</Label>
                <Select
                  name="importDest"
                  options={this.state.modelOptions}
                  value={this.state.selectedContentType}
                  onChange={({ target: { value } }) =>
                    this.selectImportDest(value)
                  }
                />
              </div>
            </Row>
            <UploadFileForm
              onRequestAnalysis={this.onRequestAnalysis}
              loadingAnalysis={this.state.analyzing}
            />
          </Block>
        </div>
      </div>
    );
  }
};

export default memo(HomePage);
