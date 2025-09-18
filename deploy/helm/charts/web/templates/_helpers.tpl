{{- define "web.name" -}}
{{- default .Chart.Name .Values.nameOverride | trunc 63 | trimSuffix "-" -}}
{{- end -}}

{{- define "web.fullname" -}}
{{- printf "%s-%s" .Release.Name (include "web.name" .) | trunc 63 | trimSuffix "-" -}}
{{- end -}}
